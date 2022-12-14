export const enum SectionLayoutType {
	Tabs = "Tabs",
	Page = "Page"
}

/**
 * Page Layout
 * @isViewNode true
 */
export interface ObjectPageLayout {
	/**
	 * sectionLayout defines the layout of the sections. The default is "Page" (all sections in one page), possible values are "Page" and "Tabs" (every section in its own tab).
	 */
	sectionLayout?: SectionLayoutType;
}
