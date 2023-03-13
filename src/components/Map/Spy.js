import React from "react";
import PropTypes from "prop-types";

function Spy(props) {
  const styles = {
    transform: `scale(${props.scale})`,
  };

  return (
    <svg
      width="31"
      height="39"
      xmlns="http://www.w3.org/2000/svg"
      style={styles}
    >
      <g fill="currentColor">
        <path d="M6.84 28.11c-.27.143-.555.29-.917.47l-1.073.54C1.617 30.753.3 31.843.3 33.684v4.454h1.4v-4.455c0-1.065 1.053-1.937 3.782-3.317l1.07-.536c.37-.186.66-.336.94-.483l-.65-1.24zM3.89 13.1h22.774v-1.4H3.89z" />
        <path d="M16.278 1.75h-.352l.176-.044.176.045zM22.114.145l3.23 13.078h-18.5L10.092.145l6.01 1.56 6.013-1.56zm1.442 11.678l-2.46-9.966L16.1 3.152l-4.994-1.297-2.473 9.967h14.92zm-8.664 9.38a3.756 3.756 0 0 1-4.07 0c-1.235-.79-1.944-2.23-1.85-3.687v-1.81h14.154v.7l-.002 1.155c-.136 2.125-1.827 3.788-3.883 3.788-1.226 0-2.324-.592-3.038-1.532a3.978 3.978 0 0 1-1.31 1.385zm1.863-3.73c.09 1.4 1.183 2.476 2.486 2.476 1.304 0 2.397-1.076 2.486-2.433v-.41h-4.97v.365zm-6.383-.367v.455c-.065 1 .404 1.95 1.205 2.462a2.357 2.357 0 0 0 2.56 0c.802-.513 1.27-1.462 1.206-2.462h.016a4.475 4.475 0 0 1-.004-.045v-.41h-4.984zM3.49 27.88l6.97-4.21 9.756 15.157-13.744-3.99 1.96-4.016-4.942-2.94zm2.722-.01l4.043 2.408-1.796 3.677 8.554 2.484-6.996-10.868-3.806 2.298z" />
        <path d="M23.45 33.723l-.434.977-.362-.746.797-.23zm-7.42-.27l-1.176-.76 5.813-9.022 6.97 4.21-4.944 2.942 1.945 4.014-6.978 2.025-.39-1.343 5.384-1.563-1.78-3.677 4.04-2.407-3.806-2.298-5.077 7.88z" />
        <path d="M23.782 29.35c.28.146.572.296.942.482l1.07.536c2.73 1.38 3.78 2.252 3.78 3.317v4.454h1.4v-4.455c0-1.84-1.316-2.93-4.55-4.566l-1.072-.54a54.662 54.662 0 0 1-.918-.47l-.652 1.24z" />
      </g>
    </svg>
  );
}

Spy.propTypes = {
  scale: PropTypes.string,
};

export default Spy;
