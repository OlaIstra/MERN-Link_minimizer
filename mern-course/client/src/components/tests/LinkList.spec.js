import React from "react";

import { LinkList } from "../LinkList";

describe("LinkList has not links", () => {
  it("no links", () => {
    const props = {
      links: []
    };

    const linksContainer = shallow(<LinkList {...props} />);

    expect(linksContainer.text()).toEqual("There are no links");
  });
});
