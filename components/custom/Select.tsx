import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  
  interface SelectCategoryProps {
    allCategories: string[];
    placeholder?: string;
    [key: string]: any; 
  }
  
  export function SelectCategory({
    allCategories,
    placeholder,
    ...props
  }: SelectCategoryProps) {
    return (
      <Select {...props}>
        <SelectTrigger className={`w-[180px]`}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
            {allCategories?.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }
  