function ArticleTags({ tagList }) {
  return (
    tagList?.length > 0 && (
      <ul className="tag-list">
        {tagList.map((tag) => (
          <li key={tag} data-test = "liTag" className="tag-default tag-pill tag-outline">
            {tag}
          </li>
        ))}
      </ul>
    )
  );
}

export default ArticleTags;
