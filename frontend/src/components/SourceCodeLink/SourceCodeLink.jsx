function SourceCodeLink({ left, right }, ...props) {
  const position = left ? "left" : right ? "right" : "";

  return (
    <ul className={`nav navbar-nav pull-xs-${position}`}>
      <li className="nav-item">
        <a
          data-test = "linkSourceCode"
          className="nav-link"
          href="https://github.com/TonyMckes/conduit-realworld-example-app"
          {...props}
        >
          <i className="ion-social-github"></i> Source code
        </a>
      </li>
    </ul>
  );
}

export default SourceCodeLink;
