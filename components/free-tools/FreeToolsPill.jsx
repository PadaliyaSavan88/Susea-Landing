// The animated "Free tools · NEW" pill. Renders its own link by default; pass
// as="span" when it sits inside another link (e.g. a mobile menu row).
export default function FreeToolsPill({ as: Tag = "a" }) {
  return (
    <Tag {...(Tag === "a" ? { href: "/free-tools" } : {})} className="ft-pill">
      <span className="ft-pill-dot" aria-hidden="true" />
      Free tools
      <span className="ft-pill-new">NEW</span>
    </Tag>
  );
}
