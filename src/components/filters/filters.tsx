import "./filters.pcss";
import CustomDropdown, {
  CustomDropdownProps,
} from "../custom-dropdown/custom-dropdown";

export type FiltersProps = {
  items: CustomDropdownProps[];
};

export default function Filters(props: FiltersProps) {
  return (
    <div className="filters">
      {props.items.map((item, index) => (
        <CustomDropdown {...item} key={index} />
      ))}
    </div>
  );
}
