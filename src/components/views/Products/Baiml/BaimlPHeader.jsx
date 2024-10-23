import Link from "next/link";


function BaimlPHeader() {
  return (
    <div className="baiml-p-header-container">
      <div className="baiml-p-standard-container baiml-p-header">
        <Link href={'/'}>
          <p>Productos</p>
        </Link>
        <div>/</div>
        <Link href={'/products/baiml'}>
          <p>Baiml</p>
        </Link>
        <div>/</div>
      </div>
    </div>
  );
}

export default BaimlPHeader;
