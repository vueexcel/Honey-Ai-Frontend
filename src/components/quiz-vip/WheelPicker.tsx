import React from "react";
import Picker from "react-mobile-picker";

function WheelPicker() {
  const ages = Array.from({ length: 82 }, (_, i) => (i + 18).toString());
  return (
    <>
      {/* <div
            className="_container_9to8h_1"
            id="quiz_age_wheel_picker"
            style={{ height: "350px" }}
          >
            <ul className="_items_9to8h_24">
              {ages.map((age) => {
                const isActive = false;

                return (
                  <li
                    className={`_item_9to8h_24 css-p039on ${
                      isActive ? "_activeItem_9to8h_48" : ""
                    }`}
                    key={age}
                    style={{ height: "36px", lineHeight: "36px" }}
                  >
                    <div>{age}</div>
                  </li>
                );
              })}
            </ul>
          </div> */}
      <div className="_container_9to8h_1">
        <Picker
          className="_items_9to8h_24"
          value={{ age: ages[0] }}
          onChange={() => {}}
          wheelMode="normal"
        >
          <Picker.Column name="age">
            {ages.map((age) => {
              return (
                <Picker.Item
                  className={`_item_9to8h_24 css-p039on ${
                    false ? "_activeItem_9to8h_48" : ""
                  }`}
                  key={age}
                  value={age}
                >
                  {age}
                </Picker.Item>
              );
            })}
          </Picker.Column>
        </Picker>
      </div>
    </>
  );
}

export default WheelPicker;
