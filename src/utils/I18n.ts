import { IValidErrorMsgs } from "./Validations.d";

type IMapString = Record<string, string>;

export type I18nFormField = {
  label: string;
  placeholder?: string;
  errors?: IValidErrorMsgs;
};

function asType<T>(value: T) {
  return value;
}

function asFormFields<Fs extends Record<string, I18nFormField>>(map: Fs) {
  return map as Record<keyof Fs, I18nFormField>;
}

export class I18n {
  constructor(data?: I18n) {
    Object.assign(this, data);
  }

  errors = asType<Record<string, string>>({
    401: "Unauthorized",
    404: "Not found",
    500: "Internal server error",
    offline: "Please check your connection.",
    PARTNER_NOT_FOUND: "Partner not found",
  });

  config = {
    nations: asType<IMapString>({}),
    nationality: asType<IMapString>({}),
    academicLevel: asType<IMapString>({}),
    hospital: asType<IMapString>({}),
    gender: asType<IMapString>({}),
    diseases: asType<IMapString>({}),
    jobTitle: asType<IMapString>({}),
    area: asType<IMapString>({}),
  };

  system = {
    yes: "Yes",
    no: "No",
    ok: "Ok",
    cancel: "Cancel",
    disagree: "Disagree",
    agree: "Agree",
    active: "Active",
    inactive: "Inactive",
    gender: "Gender",
    status: "Status",
    acceptance: "Acceptance",
    create: "Create",
    update: "Update",
    submit: "Submit",
    notices: {
      offline: "You lose connection.",
      online: "You are back online.",
    },
    common:{
      birthDay: "Ngày sinh",
      gender: "Giới tính",
      nationality: "Quốc gia",
      nation: "Dân tộc",
      jobTitle: "Chức danh",
      workSpace: "Nơi làm việc",
      academicRank: "Học Vấn",
      description: "Mô tả",
      diseases: "Bệnh Chuyên khoa",
      active: "Đã xác nhận",
      inactive: "Chưa xác nhận",
      save: "Lưu",
      wellcome: "Xin Chào"
    },
  };

  component = {
    menubar: {
      dashboard: "Dashboard",
      languages: "Languages",
      patient: "Patient",
      doctors: "Doctors",
      account: {
        manager: "Account manager",
        create: "New account",
        partner: "Partner",
        doctors: "Doctors",
        patient: "Patient",
      },
      partner: {
        root: "Partner",
        clinics: "Clinics",
        accounts: "Admin account",
        specialties: "SpecialtyType",
      },
      clinics: {
        manager: "Clinic manager",
      },
      specialties: {
        manager: "Medical Specialties",
      },
    },

    formLogin: {
      username: "User name",
      password: "Password",
      signIn: "Login",
    },
    inputs: asFormFields({
      workplace: {
        label: "Nơi làm việc",
        errors: {
          required: "Nơi làm việc bắt buộc",
        },
      },
      diseases: {
        label: "Bệnh Chuyên khoa",
        errors: {
          required: "Bệnh Chuyên khoa bắt buộc",
        },
      },
      jobTitle: {
        label: "Chức danh",
        errors: {
          required: "Chức danh là bắt buộc",
        },
      },
      gender: {
        label: "Giới tính",
        errors: {
          required: "Giới tính bắt buộc",
        },
      },
      academicRank: {
        label: "Học Vấn",
        placeholder: "Nhập học vấn",
        errors: {
          required: "Học Vấn bắt buộc",
        },
      },
      nation: {
        label: "Dân tộc",
        placeholder: "Nhập dân tộc",
        errors: {
          required: "dân tộc băt buộc",
        },
      },
      nationality: {
        label: "Quốc gia",
        placeholder: "Nhập quốc gia",
        errors: {
          required: "Quốc gia bắt buộc",
        },
      },
    }),

    accountForm: {
      firstName: {
        label: "Họ",
        placeholder: "Nhập Họ ...",
        errors: {
          required: "Họ bắt buộc",
        },
      },
      lastName: {
        label: "Tên",
        placeholder: "nhập tên",
        errors: {
          required: "Tên bắt buộc",
        },
      },
      phoneNumber: {
        label: "Số điện thoại",
        placeholder: "Nhập số điện thoại",
        errors: {
          required: "Số điện thoại bắt buộc",
        },
      },
      email: {
        label: "Email",
        placeholder: "Nhập email ...",
        errors: {
          required: "Email bắt buộc.",
          pattern: "Email không hợp lệ.",
        },
      },
      password: {
        label: "Mật khẩu",
        placeholder: "Nhập Mật khẩu",
        errors: {
          required: "Mật khẩu bắt buộc",
        },
      },
    },

    formSpecialist: asFormFields({
      specialtyType: {
        label: "Specialist code",
        placeholder: "Enter specialist code ",
        errors: {
          required: "Specialist code can not empty.",
        },
      },
      name: {
        label: "Specialist name",
        placeholder: "Enter specialist name",
        errors: {
          required: "Name code can not empty.",
        },
      },
      description: {
        label: "Specialist description",
        placeholder: "Enter specialist name",
        errors: {
          required: "Specialist description can not empty.",
        },
      },
    }),

    formSpeciateType: asFormFields({
      code: {
        label: "Code",
        placeholder: "Code specialty type",
        errors: {
          required: "Name code can not empty.",
        },
      },
      vi: {
        label: "Vi name ",
        placeholder: "Vi name specialty type name",
        errors: {
          required: "Vi name can not empty.",
        },
      },
      en: {
        label: "En name",
        placeholder: "En name specialty type name",
        errors: {
          required: "En name specialty type can not empty.",
        },
      },
    }),

    partnerForm: asFormFields({
      partner: {
        label: "Partner Code",
        placeholder: "Partner Code",
        errors: {
          required: "Partner Code can not empty.",
        },
      },
      phoneNumberExt1: {
        label: "Phone number Ext1",
        placeholder: "Phone number Ext1",
      },
      phoneNumberExt2: {
        label: "Phone number Ext2",
        placeholder: "Phone number Ext2",
      },
      address: {
        label: "Address",
        placeholder: "Address",
      },
      avatar: {
        label: "Avatar",
        placeholder: "Avatar",
      },
      tncAcceptance: {
        label: "Tnc Acceptance",
        placeholder: "Tnc Acceptance",
      },
    }),

    doctorForm: asFormFields({
      education: {
        label: "Education",
        placeholder: "Education",
      },
      note: {
        label: "Mô tả",
        placeholder: "Nhập mô tả ...",
      },
      partner: {
        label: "Phòng khám/Bệnh viện",
        placeholder: "Nhập phong khám/Bệnh viện",
        errors: {
          required: "Phòng khám/Bệnh viên bắt buộc",
        },
      },
      specialties: {
        label: "Chuyên khoa",
        placeholder: "Nhập Chuyên khoa",
        errors: {
          required: "Chuyên khoa bắt buộc",
        },
      },
    }),

    clinicForm: asFormFields({
      name: {
        label: "Clinic partner name",
        placeholder: "Enter name",
        errors: {
          required: "Name can not empty.",
        },
      },
      phoneNumber: {
        label: "Phone Number of clinic partner",
        placeholder: "Enter Phone Number",
        errors: {
          required: "Phone can not empty.",
        },
      },
      code: {
        label: "Clinic partner code",
        placeholder: "Enter code",
        errors: {
          required: "Code can not empty.",
        },
      },
      address: {
        label: "Address of clinic partner",
        placeholder: "Enter address",
        errors: {
          required: "Address can not empty.",
        },
      },
      email: {
        label: "Email clinic partner",
        placeholder: "Enter email",
        errors: {
          required: "Email can not empty.",
          pattern: "Email is invalid.",
        },
      },
      phoneNumberExt1: {
        label: "Phone Number Ext 1",
        placeholder: "Enter Phone Number",
        errors: {
          pattern: "Phone Number Ext 1 is invalid.",
        },
      },
      phoneNumberExt2: {
        label: "Phone Number Ext 2",
        placeholder: "Phone Number Ext 2 is invalid.",
        errors: {
          pattern: "Phone Number Ext 2 is invalid.",
        },
      },
      description: {
        label: "Description clinic partner",
        placeholder: "Enter description",
      },
      businessNo: {
        label: "BusinessNo clinic partner",
        placeholder: "Enter businessNo",
        errors: {
          required: "BusinessNo clinic partner can not empty.",
        },
      },
    }),
  };

  pages = {
    login: {
      forgot: "Forgot password",
    },
    consultationSchedule: {
      title: "Consultantion Schedule Partiens",
    },
    error404: {
      goToHome: "Go to home",
    },
    profileInfor: {
      changePassword: "Đổi mật khẩu",
      changeInfor: "Chỉnh sửa thông tin",
      editInfor: "Chỉnh sửa thông tin",
      editAvatar: "Cập nhật ảnh đại diện",
      infoDoctor: "Thông tin bác sỹ",
      firstName: "Họ",
      lastName: "Tên",

    }
  };
}
