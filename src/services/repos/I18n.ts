import { I18n, Locale } from "utils";
import { config as clientConfig } from "../clients/Http";
import merge from "lodash.merge";

const en = new I18n();

const languages: Record<string, I18n> = {
  "en-US": en,
  "vi-VN": new I18n(
    merge({}, en, {
      widgets: {
        menubar: { dashboard: "Bảng điều khiển", languages: "Ngôn ngữ" },
        formLogin: {
          username: "Tài khoản",
          password: "Mật khẩu",
          signIn: "Đăng nhập",
        },
      },
      pages: {
        login: {
          forgot: "Quên mật khẩu",
        },
        error404: {
          goToHome: "Quay về trang chủ.",
        },
        profileInfor:{
          title: "Thông Tin Cá Nhân",
        }
      },
    }),
  ),
};

const locales = [
  {
    title: "Tiếng Việt",
    language: "vi",
    country: "VN",
  },

  {
    title: "English",
    language: "en",
    country: "US",
  },
];

type TCSupports = "en" | "vi";
interface ICSupports {
  code: string;
  en: string;
  vn: string;
}
type ICData = Record<string, ICSupports[]>;
type TCCode = "en" | "vn";
const mapCode: Record<TCSupports | string, TCCode> = { vi: "vn" };

async function fetchConfig(code: TCCode) {
  const map = {
    gender: "gender.json",
    nations: "nation.json",
    nationality: "nationality.json",
    academicLevel: "academic_level.json",
    hospital: "clinic_hospital.json",
    diseases: "diseases.json",
    jobTitle: "jobTitle.json",
    area: "area.json",
  };

  const result: Record<string, ICData> = {};
  const errors: Record<string, Error> = {};

  await Promise.all(
    Object.entries(map).map(([name, link]) => {
      return clientConfig
        .get(link)
        .then((response) => {
          result[name] = response.data;
        })
        .catch((error) => {
          errors[name] = error;
        });
    }),
  );

  code = mapCode[code] || code;
  const mapDataI18n = () => {
    const out = {} as any;
    Object.entries(result).forEach(([key, value]) => {
      const out1 = {} as any;
      // @ts-ignore
      value?.map<ICSupports>((item: ICSupports) => {
        return (out1[item.code] = item[code]);
      });
      out[key] = out1;
      return out1;
    });
    return out;
  };

  return {
    config: mapDataI18n(),
    errors,
  };
}

class RepoI18n {
  async locales() {
    return locales.map((item) => new Locale(item));
  }

  async query(code: string) {
    const { config } = await fetchConfig(code.split("-")[0] as TCCode);
    return merge({}, languages[code], { config });
  }

  async update(
    code: string,
    { locale, data }: { locale?: Locale; data: I18n },
  ) {
    await Promise.delay(200);
    if (locale)
      Object.assign(
        locales.find((item) => {
          return `${item.language}-${item.country}` === code;
        }) || {},
        locale,
      );
    return (languages[code] = merge({}, languages[code], data));
  }
}

export const i18n = new RepoI18n();
