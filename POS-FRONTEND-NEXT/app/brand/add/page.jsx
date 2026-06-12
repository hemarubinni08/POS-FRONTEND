import CommonAddTemplate from "../../components/CommonAddTemplate";
import { STATUS_FIELD } from "../../lib/fieldUtils";

export default function BrandAdd() {
  return (
    <CommonAddTemplate
      title="Brand"
      apiPath="brand"
      extraFields={[STATUS_FIELD]}
      onSuccessPath="/brand"
      showDescription={false}
    />
  );
}