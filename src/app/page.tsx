export default function HomePage() {
  const siteName: string = "Course Hub มจ.";
  const description: string = "ศูนย์รวมข้อมูลรายวิชาสำหรับนักศึกษามหาวิทยาลัยแม่โจ้";

  return (
    <main>
      <h1>{siteName}</h1>
      <p>{description}</p>
      <section>
        <h2>เหมาะกับใคร</h2>
        <p>นักศึกษาที่ต้องการค้นหาและตรวจสอบข้อมูลรายวิชาก่อนลงทะเบียนเรียน</p>
      </section>
    </main>
  );
}