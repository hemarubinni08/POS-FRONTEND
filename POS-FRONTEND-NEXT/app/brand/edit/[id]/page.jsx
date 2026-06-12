import CommonUpdateTemplate from "../../../components/CommonUpdateTemplate";
import { STATUS_FIELD } from "../../../lib/fieldUtils";

export default function BrandUpdate() {
  return (
    <CommonUpdateTemplate
      title="Brand"
      apiPath="brand"
      recordParam="identifier"
      extraFields={[STATUS_FIELD]}
      onSuccessPath="/brand"
      showDescription={false}
    />
  );
}
