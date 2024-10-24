const removeDuplicates = (teachers: any[] | undefined) => {
  // Create a map to store unique teachers using first_name + last_name as key
  const uniqueTeachersMap = new Map();
  
  // Iterate through teachers array and keep only the first occurrence of each teacher
  teachers?.forEach(teacher => {
      const key = `${teacher.first_name}-${teacher.last_name}`;
      if (!uniqueTeachersMap.has(key)) {
          uniqueTeachersMap.set(key, teacher);
      }
  });  
  
  // Convert map values back to array
  return Array.from(uniqueTeachersMap.values());
}

export default removeDuplicates;