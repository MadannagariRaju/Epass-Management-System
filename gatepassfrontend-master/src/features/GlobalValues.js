import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // BackendUrl: "http://localhost:5000",
  BackendUrl: "http://localhost:5000",
  admin: {
    administrator: false,
    teacher: false,
    hod: false,
    watchman: false,
    student: false,
  },
  teacher: {
    student: false,
  },
  hod: {
    teacher: false,
    student: false,
  },
  administrator: {
    teacher: false,
    hod: false,
    watchman: false,
    student: false,
  },
};

const GlobalValuesSlice = createSlice({
  name: "GlobalValuesSlice",
  initialState,
  reducers: {
    // For the 'admin' object
    on_admin_administrator: (state) => {
      state.admin.administrator = true;
    },
    off_admin_administrator: (state) => {
      state.admin.administrator = false;
    },
    on_admin_teacher: (state) => {
      state.admin.teacher = true;
    },
    off_admin_teacher: (state) => {
      state.admin.teacher = false;
    },
    on_admin_hod: (state) => {
      state.admin.hod = true;
    },
    off_admin_hod: (state) => {
      state.admin.hod = false;
    },
    on_admin_watchman: (state) => {
      state.admin.watchman = true;
    },
    off_admin_watchman: (state) => {
      state.admin.watchman = false;
    },
    on_admin_student: (state) => {
      state.admin.student = true;
    },
    off_admin_student: (state) => {
      state.admin.student = false;
    },

    // For the 'teacher' object
    on_teacher_student: (state) => {
      state.teacher.student = true;
    },
    off_teacher_student: (state) => {
      state.teacher.student = false;
    },

    // For the 'hod' object
    on_hod_teacher: (state) => {
      state.hod.teacher = true;
    },
    off_hod_teacher: (state) => {
      state.hod.teacher = false;
    },
    on_hod_student: (state) => {
      state.hod.student = true;
    },
    off_hod_student: (state) => {
      state.hod.student = false;
    },

    // For the 'administrator' object
    on_administrator_teacher: (state) => {
      state.administrator.teacher = true;
    },
    off_administrator_teacher: (state) => {
      state.administrator.teacher = false;
    },
    on_administrator_hod: (state) => {
      state.administrator.hod = true;
    },
    off_administrator_hod: (state) => {
      state.administrator.hod = false;
    },
    on_administrator_watchman: (state) => {
      state.administrator.watchman = true;
    },
    off_administrator_watchman: (state) => {
      state.administrator.watchman = false;
    },
    on_administrator_student: (state) => {
      state.administrator.student = true;
    },
    off_administrator_student: (state) => {
      state.administrator.student = false;
    },
  },
});

export default GlobalValuesSlice.reducer;
export const {
  on_admin_administrator,
  off_admin_administrator,
  on_admin_teacher,
  off_admin_teacher,
  on_admin_hod,
  off_admin_hod,
  on_admin_watchman,
  off_admin_watchman,
  on_admin_student,
  off_admin_student,
  on_teacher_student,
  off_teacher_student,
  on_hod_teacher,
  off_hod_teacher,
  on_hod_student,
  off_hod_student,
  on_administrator_teacher,
  off_administrator_teacher,
  on_administrator_hod,
  off_administrator_hod,
  on_administrator_watchman,
  off_administrator_watchman,
  on_administrator_student,
  off_administrator_student,
} = GlobalValuesSlice.actions;









// import {createSlice } from "@reduxjs/toolkit"
// const initialState={
//     BackendUrl:"http://localhost:5000",
//     admin:{
//         administrator:false,
//         teacher:false,
//         hod:false,
//         watchman:false,
//         student:false
//     },
//     teacher:{
//         student:false
//     },
//     hod:{
   
//         teacher:false,
//         student:false
//     },
//     administrator:{
//         teacher:false,
//         hod:false,
//         watchman:false,
//         student:false
//     },
// }
// const GlobalValuesSlice=createSlice({
//     name:"GlobalValuesSlice",
//     initialState,
//     reducers:{
//         on_admin_administrator:(state)=>{
//             state.admin.administrator=true
//         },
//         off_admin_administrator:(state)=>{
//             state.admin.administrator=false
//         }
//     }
// })


// export default  GlobalValuesSlice.reducer
// export const {on_admin_administrator,off_admin_administrator}=GlobalValuesSlice.actions;