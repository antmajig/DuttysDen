import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "../style/style.css";
function SeasonDropdown(props) {
  return (
    <div style={{ marginBottom: "1%" }}>
      <Dropdown>
        <Dropdown.Toggle variant="dark" id="dropdown-basic">
          Season
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {props.seasons.map((season) => (
            <Dropdown.Item
              key={season.SeasonID}
              onClick={() => props.seasonSelected(season.SeasonID)}
            >
              Season {season.SeasonID}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default SeasonDropdown;
