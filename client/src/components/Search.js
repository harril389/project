import React, { useState } from "react";
import { SearchSVG, CloseSVG } from "theme/icons";

const Search = props => {
  const { id, placeHolder, onInput } = props;

  const [isShowIcon, setShowIcon] = useState(false);
  const [search, setSearch] = useState("");

  const onChange = e => {
    if (e.target.value.length > 0) {
      setShowIcon(true);
    } else if (e.target.value.length === 0) {
      setShowIcon(false);
    }
    setSearch(e.target.value);
  };

  const onClearSearch = () => {
    setSearch("");
    setShowIcon(false);
  };

  const onSubmit = e => {
    e.preventDefault();
    onInput(search);
  };

  return (
    <div className="para-search">
      <form className="form" onSubmit={onSubmit}>
        <button className="button" type="submit">
          <SearchSVG />
        </button>
        <input
          id={id}
          className="input"
          placeholder={placeHolder}
          value={search}
          type="text"
          onChange={e => {
            onChange(e);
          }}
          autoComplete="off"
        />
        {isShowIcon && (
          <button className="button" type="button" onClick={onClearSearch}>
            <CloseSVG width="10px" height="10px" />
          </button>
        )}
      </form>
    </div>
  );
};

export default Search;
