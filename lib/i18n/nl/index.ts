import common from "./common";
import shell from "./shell";
import content from "./content";
import fields from "./fields";
import api from "./api";

// Later files win, so keep shared words in `common`.
const nl: Record<string, string> = {
  ...common,
  ...shell,
  ...content,
  ...fields,
  ...api,
};

export default nl;
