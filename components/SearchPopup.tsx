export default function SearchPopup() {
  return (
    <div className="search-popup">
      <div className="color-layer"></div>
      <button className="close-search"><span className="far fa-times fa-fw"></span></button>
      <form method="post" action="/blog">
        <div className="form-group">
          <input type="search" name="search-field" defaultValue="" placeholder="Search Here" required />
          <button type="submit"><i className="fas fa-search"></i></button>
        </div>
      </form>
    </div>
  );
}
