export const courseMapper = [
  { value: 'btech_cse', label: 'B.Tech. (Computer Science and Engineering)' },
  { value: 'btech_aiml', label: 'B.Tech. CSE - (Artificial Intelligence Machine Learning)' },
  { value: 'btech_ds', label: 'B.Tech. CSE - (Data Science)' },
  { value: 'btech_cs', label: 'B.Tech. CSE - (Cyber Security)' },
  { value: 'btech_it', label: 'B.Tech. (Information Technology)' },
  { value: 'btech_ece', label: 'B.Tech. (Electronics and Communication Engineering)' },
  { value: 'btech_bt', label: 'B.Tech. Biotechnology' },
  { value: 'mtech_cse', label: 'M.Tech. (Computer Science and Engineering)' },
  { value: 'bba_general', label: 'BBA (General)' },
  { value: 'bba_ba', label: 'BBA (Business Analytics)' },
  { value: 'bcom', label: 'B.Com.' },
  { value: 'mba', label: 'MBA (Master of Business Administration)' },
  { value: 'mcom', label: 'M.Com.' },
  { value: 'bsc_df', label: 'B.Sc. (Digital Forensics)' },
  { value: 'bca', label: 'BCA (Bachelor of Computer Application)' },
  { value: 'mca', label: 'MCA (Master of Computer Application)' },
  { value: 'bsc_agri', label: 'B.Sc. (Hons.) Agriculture' },
  { value: 'bsc_horti', label: 'B.Sc. (Hons.) Horticulture' },
  { value: 'bsc_fs', label: 'B.Sc. (Hons) Food Science' },
  { value: 'bpharm', label: 'B.Pharmacy' },
  { value: 'bpt', label: 'Bachelor of Physiotherapy (BPT)' },
  { value: 'bsc_aott', label: 'B.Sc (Anaesthesia and Operation Theatre Technology)' },
  { value: 'bsc_cvt', label: 'B.Sc (Cardiovascular Technology)' },
  { value: 'bsc_rmit', label: 'B.Sc (Radiology Medical Imaging Technology)' },
  { value: 'bsc_mlt', label: 'B.Sc (Medical Laboratory Technology)' },
  { value: 'bsc_hp', label: 'B.Sc Health Psychology' },
  { value: 'bsc_emcct', label: 'B.Sc (Emergency Medicine & Critical Care Technology)' },
  { value: 'bsc_cndfs', label: 'B.Sc (Clinical Nutrition, Dietetics & Food Science)' },
  { value: 'boptometry', label: 'B.Optometry' },
  { value: 'mpt', label: 'Master of Physiotherapy (MPT)' },
  { value: 'btech_ce', label: 'B.Tech. (Civil Engineering)' },
  { value: 'btech_me', label: 'B.Tech. (Mechanical Engineering)' },
  { value: 'btech_eee', label: 'B.Tech. (Electrical & Electronics Engineering)' },
  { value: 'pharmd', label: 'Pharm-D' }
];


export const getCourseKeyByLabel = (value: string) => {
  console.log(value);
  return 'nip'
  // const course = courseMapper.find(course => course.value.toLowerCase() === value.toLowerCase());
  // return course ? course.label : null;
};
