import { ISideBarIconProps } from "./interfaces";
import useStyles from "./style";

const FinanceIcon = (props: ISideBarIconProps) => {
  const classes = useStyles();
  const { isActive } = props;
  return isActive ? (
    <i className={classes.menuIcon}>
    <svg width={25} height='25'
      xmlns="http://www.w3.org/2000/svg"
      data-name="line expand"
      viewBox="0 0 48 48"
    >
      <path
        fill="#1a1a1a"
        d="M26.578,26.456a9.85,9.85,0,0,0-4.923,1.316.75.75,0,1,0,.751,1.3,8.361,8.361,0,1,1-1.716,1.315.75.75,0,1,0-1.058-1.063,9.847,9.847,0,1,0,6.946-2.867Z"
      />
      <path
        fill="#1a1a1a"
        d="M27.393 39.268H25.51A1.108 1.108 0 0 1 24.4 38.161a.75.75 0 0 0-1.5 0 2.61 2.61 0 0 0 2.607 2.607H25.7v1.438a.75.75 0 0 0 1.5 0V40.768h.191a2.607 2.607 0 0 0 0-5.214H25.51a1.108 1.108 0 0 1 0-2.215h1.883A1.108 1.108 0 0 1 28.5 34.446a.75.75 0 0 0 1.5 0 2.61 2.61 0 0 0-2.607-2.607H27.2V30.4a.75.75 0 0 0-1.5 0v1.439H25.51a2.608 2.608 0 0 0 0 5.215h1.883a1.107 1.107 0 0 1 0 2.214zM44.417 15.637a.75.75 0 0 0-.4 1.445c2.029.564 2.486 1.2 2.486 1.372 0 .626-2.935 2.094-8.625 2.094s-8.626-1.468-8.626-2.094 2.934-2.094 8.626-2.094a27.333 27.333 0 0 1 4.023.283.751.751 0 0 0 .221-1.485 29.106 29.106 0 0 0-4.244-.3c-4.877 0-10.126 1.125-10.126 3.594v5.835c0 2.469 5.249 3.594 10.126 3.594 3.278 0 6.718-.511 8.625-1.595v.918c0 .626-2.935 2.094-8.625 2.094-.653 0-1.289-.02-1.9-.06a.758.758 0 0 0-.8.7.749.749 0 0 0 .7.8c.645.042 1.314.064 2 .064 3.278 0 6.718-.511 8.625-1.6v.918c0 .626-2.935 2.1-8.625 2.1l-.247 0c-.042 0-.066 0-.2 0a.779.779 0 0 0-.772.727.752.752 0 0 0 .728.773c.1 0 .163 0 .205 0l.1 0 .194 0c3.278 0 6.718-.512 8.625-1.6v.918c0 .626-2.935 2.094-8.625 2.094a.75.75 0 0 0 0 1.5c3.278 0 6.718-.512 8.625-1.595v.991c0 .626-2.935 2.094-8.625 2.094h-.269a.794.794 0 0 0-.758.742.751.751 0 0 0 .742.758h.285C42.751 39.625 48 38.5 48 36.031V18.454C48 17.624 47.378 16.462 44.417 15.637zm-6.542 6.411c3.278 0 6.718-.511 8.625-1.595v.918c0 .626-2.935 2.1-8.625 2.1s-8.626-1.469-8.626-2.1v-.918C31.156 21.537 34.6 22.048 37.875 22.048zm0 4.335c-5.692 0-8.626-1.468-8.626-2.094v-.918c1.907 1.084 5.346 1.6 8.626 1.6s6.718-.511 8.625-1.6v.918C46.5 24.915 43.565 26.383 37.875 26.383zM15.8 40.28c-.264.01-.53.016-.8.016-7.95 0-13.5-4.561-13.5-11.091 0-5.325 3.6-13.2 8.969-16.435.073-.045.134-.1.2-.15H16.8a.75.75 0 0 0 0-1.5H11.615a2.25 2.25 0 0 0-.326-1.626C8.754 5.567 8.261 3.8 8.353 3.342a.053.053 0 0 0 .032.007 11.7 11.7 0 0 1 3.323.506 11.594 11.594 0 0 0 3.214.5 15.118 15.118 0 0 0 3.643-.538 13.576 13.576 0 0 1 2.883-.468c-.027.565-.587 2.234-2.524 5.54H13.2a.75.75 0 0 0 0 1.5h5.062a2.234 2.234 0 0 0 .048.837 2.409 2.409 0 0 0 1.133 1.486 18.354 18.354 0 0 1 6.348 7.069.75.75 0 1 0 1.317-.717 19.853 19.853 0 0 0-6.9-7.643.927.927 0 0 1-.443-.563.76.76 0 0 1 .091-.591c3.764-6.262 3.156-7.337 2.9-7.8a1.253 1.253 0 0 0-1.132-.625 14.31 14.31 0 0 0-3.4.511 13.742 13.742 0 0 1-3.3.5 10.2 10.2 0 0 1-2.83-.453 13.307 13.307 0 0 0-3.707-.556 1.425 1.425 0 0 0-1.335.725c-.252.463-.922 1.693 2.979 7.735a.759.759 0 0 1 .109.6.932.932 0 0 1-.444.581C3.9 14.982 0 23.471 0 29.205 0 36.5 6.31 41.8 15 41.8q.432 0 .858-.018a.75.75 0 1 0-.059-1.5z"
      />
    </svg>
    </i>
  ) : (
    <i className={classes.menuIcon}>
    <svg width={25} height='25'
      xmlns="http://www.w3.org/2000/svg"
      data-name="line expand"
      viewBox="0 0 48 48"
    >
      <path
        fill="#1a1a1a"
        d="M26.578,26.456a9.85,9.85,0,0,0-4.923,1.316.75.75,0,1,0,.751,1.3,8.361,8.361,0,1,1-1.716,1.315.75.75,0,1,0-1.058-1.063,9.847,9.847,0,1,0,6.946-2.867Z"
      />
      <path
        fill="#1a1a1a"
        d="M27.393 39.268H25.51A1.108 1.108 0 0 1 24.4 38.161a.75.75 0 0 0-1.5 0 2.61 2.61 0 0 0 2.607 2.607H25.7v1.438a.75.75 0 0 0 1.5 0V40.768h.191a2.607 2.607 0 0 0 0-5.214H25.51a1.108 1.108 0 0 1 0-2.215h1.883A1.108 1.108 0 0 1 28.5 34.446a.75.75 0 0 0 1.5 0 2.61 2.61 0 0 0-2.607-2.607H27.2V30.4a.75.75 0 0 0-1.5 0v1.439H25.51a2.608 2.608 0 0 0 0 5.215h1.883a1.107 1.107 0 0 1 0 2.214zM44.417 15.637a.75.75 0 0 0-.4 1.445c2.029.564 2.486 1.2 2.486 1.372 0 .626-2.935 2.094-8.625 2.094s-8.626-1.468-8.626-2.094 2.934-2.094 8.626-2.094a27.333 27.333 0 0 1 4.023.283.751.751 0 0 0 .221-1.485 29.106 29.106 0 0 0-4.244-.3c-4.877 0-10.126 1.125-10.126 3.594v5.835c0 2.469 5.249 3.594 10.126 3.594 3.278 0 6.718-.511 8.625-1.595v.918c0 .626-2.935 2.094-8.625 2.094-.653 0-1.289-.02-1.9-.06a.758.758 0 0 0-.8.7.749.749 0 0 0 .7.8c.645.042 1.314.064 2 .064 3.278 0 6.718-.511 8.625-1.6v.918c0 .626-2.935 2.1-8.625 2.1l-.247 0c-.042 0-.066 0-.2 0a.779.779 0 0 0-.772.727.752.752 0 0 0 .728.773c.1 0 .163 0 .205 0l.1 0 .194 0c3.278 0 6.718-.512 8.625-1.6v.918c0 .626-2.935 2.094-8.625 2.094a.75.75 0 0 0 0 1.5c3.278 0 6.718-.512 8.625-1.595v.991c0 .626-2.935 2.094-8.625 2.094h-.269a.794.794 0 0 0-.758.742.751.751 0 0 0 .742.758h.285C42.751 39.625 48 38.5 48 36.031V18.454C48 17.624 47.378 16.462 44.417 15.637zm-6.542 6.411c3.278 0 6.718-.511 8.625-1.595v.918c0 .626-2.935 2.1-8.625 2.1s-8.626-1.469-8.626-2.1v-.918C31.156 21.537 34.6 22.048 37.875 22.048zm0 4.335c-5.692 0-8.626-1.468-8.626-2.094v-.918c1.907 1.084 5.346 1.6 8.626 1.6s6.718-.511 8.625-1.6v.918C46.5 24.915 43.565 26.383 37.875 26.383zM15.8 40.28c-.264.01-.53.016-.8.016-7.95 0-13.5-4.561-13.5-11.091 0-5.325 3.6-13.2 8.969-16.435.073-.045.134-.1.2-.15H16.8a.75.75 0 0 0 0-1.5H11.615a2.25 2.25 0 0 0-.326-1.626C8.754 5.567 8.261 3.8 8.353 3.342a.053.053 0 0 0 .032.007 11.7 11.7 0 0 1 3.323.506 11.594 11.594 0 0 0 3.214.5 15.118 15.118 0 0 0 3.643-.538 13.576 13.576 0 0 1 2.883-.468c-.027.565-.587 2.234-2.524 5.54H13.2a.75.75 0 0 0 0 1.5h5.062a2.234 2.234 0 0 0 .048.837 2.409 2.409 0 0 0 1.133 1.486 18.354 18.354 0 0 1 6.348 7.069.75.75 0 1 0 1.317-.717 19.853 19.853 0 0 0-6.9-7.643.927.927 0 0 1-.443-.563.76.76 0 0 1 .091-.591c3.764-6.262 3.156-7.337 2.9-7.8a1.253 1.253 0 0 0-1.132-.625 14.31 14.31 0 0 0-3.4.511 13.742 13.742 0 0 1-3.3.5 10.2 10.2 0 0 1-2.83-.453 13.307 13.307 0 0 0-3.707-.556 1.425 1.425 0 0 0-1.335.725c-.252.463-.922 1.693 2.979 7.735a.759.759 0 0 1 .109.6.932.932 0 0 1-.444.581C3.9 14.982 0 23.471 0 29.205 0 36.5 6.31 41.8 15 41.8q.432 0 .858-.018a.75.75 0 1 0-.059-1.5z"
      />
    </svg>
    </i>
  );
};
export default FinanceIcon;