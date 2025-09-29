import { Fragment } from "react";

import { usePathname } from "@/i18n/navigation";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";

const formatSegment = (segment: string) => segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

// TODO breadcrumbs disappear on mobile
export const Breadcrumbs = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;
          const label = formatSegment(segment);

          return (
            <Fragment key={index}>
              <BreadcrumbItem className="hidden md:block">
                {href !== pathname ? <BreadcrumbLink href={href}>{label}</BreadcrumbLink> : <BreadcrumbPage>{label}</BreadcrumbPage>}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
