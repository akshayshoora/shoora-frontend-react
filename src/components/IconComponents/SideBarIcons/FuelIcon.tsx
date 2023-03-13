import { ISideBarIconProps } from "./interfaces";
import useStyles from "./style";

const FuelIcon = (props: ISideBarIconProps) => {
  const classes = useStyles();
  const { isActive } = props;
  return isActive ? (
    <i className={classes.menuIcon}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 8.467 8.467"
      >
        <g fill="#3b3c3d" fillRule="evenodd">
          <path d="m1.323 7.409-.397.529h5.027l-.397-.53z" />
          <path
            d="M5.689 291.973v.264c.22 0 .396.176.396.397v1.852c0 .364.298.662.662.662a.663.663 0 0 0 .661-.662v-2.447h-.264v2.447c0 .221-.176.397-.397.397a.395.395 0 0 1-.397-.397v-1.852a.663.663 0 0 0-.661-.661zm1.437-2.315-.23.131.248.433v.758h.264v-.828z"
            color="#000"
            fontFamily="sans-serif"
            fontWeight="400"
            overflow="visible"
            transform="translate(0 -288.533)"
          />
          <path d="M7.011 2.646h.53v.662h-.53zM1.72.53a.265.265 0 0 0-.265.265v6.35h3.969V.794A.265.265 0 0 0 5.159.53zm.124.387h3.175v1.323H1.844zm1.596 2.81s.641.748.641 1.103a.643.643 0 0 1-.641.645.643.643 0 0 1-.642-.645c0-.355.642-1.104.642-1.104z" />
        </g>
      </svg>
    </i>
  ) : (
    <i className={classes.menuIcon}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 8.467 8.467"
      >
        <g fill="#3b3c3d" fillRule="evenodd">
          <path d="m1.323 7.409-.397.529h5.027l-.397-.53z" />
          <path
            d="M5.689 291.973v.264c.22 0 .396.176.396.397v1.852c0 .364.298.662.662.662a.663.663 0 0 0 .661-.662v-2.447h-.264v2.447c0 .221-.176.397-.397.397a.395.395 0 0 1-.397-.397v-1.852a.663.663 0 0 0-.661-.661zm1.437-2.315-.23.131.248.433v.758h.264v-.828z"
            color="#000"
            fontFamily="sans-serif"
            fontWeight="400"
            overflow="visible"
            transform="translate(0 -288.533)"
          />
          <path d="M7.011 2.646h.53v.662h-.53zM1.72.53a.265.265 0 0 0-.265.265v6.35h3.969V.794A.265.265 0 0 0 5.159.53zm.124.387h3.175v1.323H1.844zm1.596 2.81s.641.748.641 1.103a.643.643 0 0 1-.641.645.643.643 0 0 1-.642-.645c0-.355.642-1.104.642-1.104z" />
        </g>
      </svg>
    </i>
  );
};
export default FuelIcon;
