CREATE TYPE "public"."action_owner" AS ENUM('patient', 'coordinator', 'provider');--> statement-breakpoint
CREATE TYPE "public"."availability_kind" AS ENUM('consultation', 'treatment_window');--> statement-breakpoint
CREATE TYPE "public"."case_status" AS ENUM('enquiry_received', 'coordinator_review', 'awaiting_provider', 'clinical_assessment', 'comparing', 'decision', 'preparing', 'treatment', 'follow_up', 'paused', 'declined', 'closed');--> statement-breakpoint
CREATE TYPE "public"."cost_certainty" AS ENUM('confirmed', 'estimated', 'unknown');--> statement-breakpoint
CREATE TYPE "public"."concern" AS ENUM('time', 'cost', 'both');--> statement-breakpoint
CREATE TYPE "public"."contact_preference" AS ENUM('email', 'phone');--> statement-breakpoint
CREATE TYPE "public"."clinician_discussed" AS ENUM('yes', 'no', 'not_sure');--> statement-breakpoint
CREATE TYPE "public"."message_kind" AS ENUM('note', 'question', 'answer');--> statement-breakpoint
CREATE TYPE "public"."uk_nation" AS ENUM('england', 'scotland', 'wales', 'northern_ireland');--> statement-breakpoint
CREATE TYPE "public"."procedure_interest" AS ENUM('hip', 'knee', 'not_sure');--> statement-breakpoint
CREATE TYPE "public"."proposal_status" AS ENUM('draft', 'published', 'superseded', 'withdrawn');--> statement-breakpoint
CREATE TYPE "public"."responsibility_kind" AS ENUM('clinical_assessment', 'complications', 'follow_up', 'escalation');--> statement-breakpoint
CREATE TYPE "public"."session_kind" AS ENUM('staff', 'patient');--> statement-breakpoint
CREATE TYPE "public"."task_party" AS ENUM('patient', 'coordinator', 'provider');--> statement-breakpoint
CREATE TYPE "public"."task_status" AS ENUM('open', 'done', 'blocked');--> statement-breakpoint
CREATE TYPE "public"."uk_cost_source" AS ENUM('patient_quote', 'published_benchmark');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('coordinator', 'admin');--> statement-breakpoint
CREATE TYPE "public"."wait_kind" AS ENUM('appointment_date', 'estimate', 'assumption', 'unknown');--> statement-breakpoint
CREATE TABLE "audit_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"actor_user_id" uuid,
	"case_id" uuid,
	"action" text NOT NULL,
	"entity_type" text NOT NULL,
	"entity_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "availability_confirmations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"proposal_id" uuid NOT NULL,
	"kind" "availability_kind" NOT NULL,
	"source" text NOT NULL,
	"confirmed_on" date NOT NULL,
	"window_start" date,
	"window_end" date,
	"conditions" text DEFAULT '' NOT NULL,
	"dependencies" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "case_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"case_id" uuid NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"relationship" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cases" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"reference" text NOT NULL,
	"concern" "concern" NOT NULL,
	"procedure" "procedure_interest" NOT NULL,
	"clinician_discussed" "clinician_discussed" NOT NULL,
	"uk_nation" "uk_nation" NOT NULL,
	"location" text NOT NULL,
	"wait_kind" "wait_kind" NOT NULL,
	"wait_detail" text,
	"quote_amount_minor" integer,
	"quote_date" date,
	"timeframe" text NOT NULL,
	"contact_name" text NOT NULL,
	"contact_email" text NOT NULL,
	"contact_phone" text,
	"contact_preference" "contact_preference" NOT NULL,
	"status" "case_status" DEFAULT 'enquiry_received' NOT NULL,
	"owner_id" uuid,
	"next_action" text DEFAULT 'Review the enquiry and contact the person.' NOT NULL,
	"next_action_owner" "action_owner" DEFAULT 'coordinator' NOT NULL,
	"response_due_on" date,
	"pause_reason" text,
	"decline_reason" text,
	"access_key_hash" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "cases_reference_unique" UNIQUE("reference")
);
--> statement-breakpoint
CREATE TABLE "clinicians" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provider_id" uuid NOT NULL,
	"name" text NOT NULL,
	"registration_body" text,
	"registration_number" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "communications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"case_id" uuid NOT NULL,
	"author_user_id" uuid,
	"author_label" text NOT NULL,
	"kind" "message_kind" NOT NULL,
	"body" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "consent_records" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"case_id" uuid NOT NULL,
	"version" text NOT NULL,
	"statement" text NOT NULL,
	"accepted_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "credential_checks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provider_id" uuid NOT NULL,
	"clinician_id" uuid,
	"check_type" text NOT NULL,
	"outcome" text NOT NULL,
	"notes" text,
	"checked_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"case_id" uuid NOT NULL,
	"filename" text NOT NULL,
	"content_type" text NOT NULL,
	"byte_size" integer NOT NULL,
	"storage_key" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "proposal_cost_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"proposal_id" uuid NOT NULL,
	"category" text NOT NULL,
	"label" text NOT NULL,
	"amount_minor" integer,
	"certainty" "cost_certainty" NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "proposals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"case_id" uuid NOT NULL,
	"provider_id" uuid NOT NULL,
	"clinician_id" uuid,
	"version" integer NOT NULL,
	"status" "proposal_status" DEFAULT 'draft' NOT NULL,
	"procedure_exact" text DEFAULT '' NOT NULL,
	"laterality" text DEFAULT 'not_supplied' NOT NULL,
	"package_spec" text DEFAULT '' NOT NULL,
	"currency" text DEFAULT 'GBP' NOT NULL,
	"gbp_per_unit" text,
	"exchange_rate_on" date,
	"exchange_rate_label" text,
	"uk_source" "uk_cost_source",
	"uk_amount_minor" integer,
	"uk_benchmark_label" text,
	"uk_benchmark_date" date,
	"cancellation_terms" text DEFAULT '' NOT NULL,
	"payment_recipient" text DEFAULT '' NOT NULL,
	"exclusions" text DEFAULT '' NOT NULL,
	"unpriced_items" text DEFAULT '' NOT NULL,
	"contingency" text DEFAULT '' NOT NULL,
	"expires_on" date,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "providers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"country" text DEFAULT 'India' NOT NULL,
	"registration_notes" text,
	"approved_for_live_cases" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "responsibilities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"proposal_id" uuid NOT NULL,
	"kind" "responsibility_kind" NOT NULL,
	"party_name" text DEFAULT '' NOT NULL,
	"contact" text DEFAULT '' NOT NULL,
	"description" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"token_hash" text NOT NULL,
	"kind" "session_kind" NOT NULL,
	"user_id" uuid,
	"case_id" uuid,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"case_id" uuid NOT NULL,
	"title" text NOT NULL,
	"detail" text DEFAULT '' NOT NULL,
	"party" "task_party" NOT NULL,
	"status" "task_status" DEFAULT 'open' NOT NULL,
	"due_on" date,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"role" "user_role" NOT NULL,
	"password_hash" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "audit_events" ADD CONSTRAINT "audit_events_actor_user_id_users_id_fk" FOREIGN KEY ("actor_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_events" ADD CONSTRAINT "audit_events_case_id_cases_id_fk" FOREIGN KEY ("case_id") REFERENCES "public"."cases"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "availability_confirmations" ADD CONSTRAINT "availability_confirmations_proposal_id_proposals_id_fk" FOREIGN KEY ("proposal_id") REFERENCES "public"."proposals"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "case_members" ADD CONSTRAINT "case_members_case_id_cases_id_fk" FOREIGN KEY ("case_id") REFERENCES "public"."cases"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cases" ADD CONSTRAINT "cases_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "clinicians" ADD CONSTRAINT "clinicians_provider_id_providers_id_fk" FOREIGN KEY ("provider_id") REFERENCES "public"."providers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "communications" ADD CONSTRAINT "communications_case_id_cases_id_fk" FOREIGN KEY ("case_id") REFERENCES "public"."cases"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "communications" ADD CONSTRAINT "communications_author_user_id_users_id_fk" FOREIGN KEY ("author_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "consent_records" ADD CONSTRAINT "consent_records_case_id_cases_id_fk" FOREIGN KEY ("case_id") REFERENCES "public"."cases"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "credential_checks" ADD CONSTRAINT "credential_checks_provider_id_providers_id_fk" FOREIGN KEY ("provider_id") REFERENCES "public"."providers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "credential_checks" ADD CONSTRAINT "credential_checks_clinician_id_clinicians_id_fk" FOREIGN KEY ("clinician_id") REFERENCES "public"."clinicians"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_case_id_cases_id_fk" FOREIGN KEY ("case_id") REFERENCES "public"."cases"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "proposal_cost_items" ADD CONSTRAINT "proposal_cost_items_proposal_id_proposals_id_fk" FOREIGN KEY ("proposal_id") REFERENCES "public"."proposals"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_case_id_cases_id_fk" FOREIGN KEY ("case_id") REFERENCES "public"."cases"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_provider_id_providers_id_fk" FOREIGN KEY ("provider_id") REFERENCES "public"."providers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_clinician_id_clinicians_id_fk" FOREIGN KEY ("clinician_id") REFERENCES "public"."clinicians"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "responsibilities" ADD CONSTRAINT "responsibilities_proposal_id_proposals_id_fk" FOREIGN KEY ("proposal_id") REFERENCES "public"."proposals"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_case_id_cases_id_fk" FOREIGN KEY ("case_id") REFERENCES "public"."cases"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_case_id_cases_id_fk" FOREIGN KEY ("case_id") REFERENCES "public"."cases"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "cases_status_idx" ON "cases" USING btree ("status");--> statement-breakpoint
CREATE INDEX "proposals_case_idx" ON "proposals" USING btree ("case_id");--> statement-breakpoint
CREATE UNIQUE INDEX "sessions_token_hash_idx" ON "sessions" USING btree ("token_hash");