import { Schema, model } from 'mongoose';
import { IStudent, StudentModel } from './student.interface';

export const studentSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        middleName: {
          type: String,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
    },
    dateOfBirth: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactNo: {
      type: String,
      required: true,
      unique: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    presentAddress: {
      required: true,
      type: String,
    },
    permanentAddress: {
      required: true,
      type: String,
    },
    guardian: {
      required: true,
      type: {
        fatherName: {
          type: String,
          required: true,
        },
        fatherOccupation: {
          type: String,
          required: true,
        },
        fatherContactNo: {
          type: String,
          required: true,
        },
        motherName: {
          type: String,
          required: true,
        },
        motherOccupation: {
          type: String,
          required: true,
        },
        motherContactNo: {
          type: String,
          required: true,
        },
        address: {
          required: true,
          type: String,
        },
      },
    },
    localGuardian: {
      required: true,
      name: {
        type: String,
        required: true,
      },
      occupation: {
        type: String,
        required: true,
      },
      contactNo: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
    profileImage: { type: String, required: true },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicDepartment',
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicFaculty',
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicSemester',
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export const Student = model<IStudent>('Student', studentSchema);
