import './filters.pcss';
import CustomDropdown, {
  CustomDropdownProps,
} from '../custom-dropdown/custom-dropdown';
import { FC } from 'react';

export type FiltersProps = {
  items: CustomDropdownProps[];
};

const Filters: FC<FiltersProps> = ({ items }) => (
  <div className="filters">
    {items.map((item, index) => (
      <CustomDropdown {...item} key={index}/>
    ))}
  </div>
);

export default Filters;
