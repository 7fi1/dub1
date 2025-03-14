import { PageContent } from "@/ui/layout/page-content";
import { MaxWidthWrapper } from "@dub/ui";
import { AddPartnerButton } from "./add-partner-button";
import { ImportExportButtons } from "./import-export-buttons";
import { InvitesTableLink } from "./invites-table-link";
import { ProgramPartnersPageClient } from "./page-client";

export default function ProgramPartners() {
  return (
    <PageContent
      title="Partners"
      titleControls={
        <div className="flex items-center gap-2">
          <AddPartnerButton />
          <InvitesTableLink />
          <ImportExportButtons />
        </div>
      }
    >
      <MaxWidthWrapper>
        <ProgramPartnersPageClient />
      </MaxWidthWrapper>
    </PageContent>
  );
}
