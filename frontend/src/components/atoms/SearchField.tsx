import React, { FunctionComponent } from "react";
import { InputAdornment, TextField, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";

type SearchFieldProps = {
  id: string;
  variant: "standard" | "outlined" | "filled";
  type: string;
  placeholder: string;
  margin: "none" | "dense" | "normal";
  label: string;
  disabled: boolean;
  name: string;
  searchTerm: string;
  setSearchTerm: (string: string) => void;
  autoFocus?: boolean;
};

const SearchField: FunctionComponent<SearchFieldProps> = ({
  id,
  variant,
  type,
  placeholder,
  margin,
  label,
  disabled,
  name,
  searchTerm,
  setSearchTerm,
  autoFocus = false,
}: SearchFieldProps) => {
  const onSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div id="tableSearchField">
      <TextField
        value={searchTerm}
        onChange={onSearchChange}
        id={id}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <IconButton
              onClick={() => {
                setSearchTerm("");
              }}
              style={{ padding: 5 }}
              title={"Reset Search"}
            >
              <ClearIcon style={{ width: 20, height: 20 }} />
            </IconButton>
          ),
        }}
        variant={variant}
        type={type}
        placeholder={placeholder}
        margin={margin}
        label={label}
        disabled={disabled}
        name={name}
        autoFocus={autoFocus}
      />
    </div>
  );
};
export default SearchField;
