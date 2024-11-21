const NotesAboutStudent = ({desc}: { desc: string }) => {
  return (
    <p style={{
      color: desc === null ? "red": "#6F6F6F",
      maxWidth: "500px",
      marginTop: "2.4rem"
    }}>{desc === null ? "لا توجد ملاحظات" : `${desc}`}</p>
  )
}

export default NotesAboutStudent