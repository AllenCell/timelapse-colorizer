import { Checkbox, Tooltip } from "antd";
import React, { type ReactElement } from "react";

import { ViewMode } from "src/colorizer/types";
import DropdownWithColorPicker from "src/components/Dropdowns/DropdownWithColorPicker";
import { SettingsContainer, SettingsItem } from "src/components/SettingsContainer";
import ToggleCollapse from "src/components/ToggleCollapse";
import { useViewerStateStore } from "src/state";
import { VisuallyHidden } from "src/styles/utils";

import { SETTINGS_GAP_PX } from "./constants";

const enum ViewportSettingsHtmlIds {
  SCALE_BAR_SWITCH = "scale-bar-switch",
  TIMESTAMP_SWITCH = "timestamp-switch",
  INTERPOLATE_3D_SWITCH = "interpolate-3d-switch",
  BACKGROUND_COLOR_DROPDOWN = "background-color-dropdown",
}

const AUTO_BACKGROUND_COLOR = "auto";
const CUSTOM_BACKGROUND_COLOR = "custom";
const BACKGROUND_COLOR_ITEMS = [
  { value: AUTO_BACKGROUND_COLOR, label: "Auto" },
  { value: CUSTOM_BACKGROUND_COLOR, label: "Custom" },
];
export const BACKGROUND_COLOR_PRESETS = [
  {
    label: "Presets",
    colors: ["#ffffff", "#dddddd", "#c0c0c0", "#9d9d9d", "#808080", "#525252", "#393939", "#000000"],
  },
];

export default function ViewportSettings(): ReactElement {
  const interpolate3d = useViewerStateStore((state) => state.interpolate3d);
  const setInterpolate3d = useViewerStateStore((state) => state.setInterpolate3d);
  const setShowScaleBar = useViewerStateStore((state) => state.setShowScaleBar);
  const setShowTimestamp = useViewerStateStore((state) => state.setShowTimestamp);
  const useAutoBackgroundColor = useViewerStateStore((state) => state.useAutoBackgroundColor);
  const setUseAutoBackgroundColor = useViewerStateStore((state) => state.setUseAutoBackgroundColor);
  const backgroundColor = useViewerStateStore((state) => state.backgroundColor);
  const setBackgroundColor = useViewerStateStore((state) => state.setBackgroundColor);
  const showScaleBar = useViewerStateStore((state) => state.showScaleBar);
  const showTimestamp = useViewerStateStore((state) => state.showTimestamp);
  const viewMode = useViewerStateStore((state) => state.viewMode);

  const isDataset3d = viewMode === ViewMode.VIEW_3D;

  return (
    <ToggleCollapse label="Viewport">
      <SettingsContainer gapPx={SETTINGS_GAP_PX}>
        <SettingsItem label="Background color" htmlFor={ViewportSettingsHtmlIds.BACKGROUND_COLOR_DROPDOWN}>
          <div style={{ marginBottom: "auto" }}>
            <DropdownWithColorPicker
              id={ViewportSettingsHtmlIds.BACKGROUND_COLOR_DROPDOWN}
              dropdownProps={{
                selected: useAutoBackgroundColor ? AUTO_BACKGROUND_COLOR : CUSTOM_BACKGROUND_COLOR,
                items: BACKGROUND_COLOR_ITEMS,
                onChange: (value) => setUseAutoBackgroundColor(value === AUTO_BACKGROUND_COLOR),
              }}
              showColorPicker={!useAutoBackgroundColor}
              colorPickerProps={{
                color: backgroundColor,
                onChange: (color) => setBackgroundColor(color),
                presets: BACKGROUND_COLOR_PRESETS,
              }}
            />
          </div>
        </SettingsItem>
        <SettingsItem
          label="Scale bar"
          htmlFor={ViewportSettingsHtmlIds.SCALE_BAR_SWITCH}
          labelStyle={{ marginTop: "1px" }}
        >
          <div>
            <Checkbox
              id={ViewportSettingsHtmlIds.SCALE_BAR_SWITCH}
              checked={showScaleBar}
              onChange={(e) => setShowScaleBar(e.target.checked)}
            />
          </div>
        </SettingsItem>
        <SettingsItem
          label="Timestamp"
          htmlFor={ViewportSettingsHtmlIds.TIMESTAMP_SWITCH}
          labelStyle={{ marginTop: "1px" }}
        >
          <div>
            <Checkbox
              id={ViewportSettingsHtmlIds.TIMESTAMP_SWITCH}
              checked={showTimestamp}
              onChange={(e) => setShowTimestamp(e.target.checked)}
            />
          </div>
        </SettingsItem>
        {isDataset3d && (
          <SettingsItem
            label="Interpolate 3D data"
            htmlFor={ViewportSettingsHtmlIds.INTERPOLATE_3D_SWITCH}
            labelStyle={{ marginTop: "1px" }}
          >
            <Tooltip
              title={
                (interpolate3d ? "Turn off " : "Turn on ") +
                "interpolation of 3D volume data (reduces pixel artifacts)."
              }
              placement="right"
              trigger={["focus", "hover"]}
            >
              <div style={{ width: "fit-content" }}>
                <Checkbox
                  id={ViewportSettingsHtmlIds.INTERPOLATE_3D_SWITCH}
                  checked={interpolate3d}
                  onChange={(e) => setInterpolate3d(e.target.checked)}
                  style={{ paddingTop: "0" }}
                />
                <VisuallyHidden>Interpolates 3D volume data to reduce pixel artifacts.</VisuallyHidden>
              </div>
            </Tooltip>
          </SettingsItem>
        )}
      </SettingsContainer>
    </ToggleCollapse>
  );
}
