import { I18n, Locale } from "untils";
import { config as clientConfig } from "../Clients/Http";
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

type ICSupports = "en" | "vi";
type ICData = Record<string, Record<ICSupports, string>>;
const mapCode: Record<ICSupports | string, string> = { vi: "vn" };

async function fetchConfig(code: ICSupports) {
  const map = {
    gender: "gender.json",
    nations: "nation.json",
    nationality: "nationality.json",
    academicLevel: "academic_level.json",
    hospital: "clinic_hospital.json",
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

  code = (mapCode[code] as ICSupports) || code;
 console.log('config', result);

  return {
    config:{},
    // config: Object.map(result, (value) => {
    //   return Object.map(value, (data) => data[code]);
    // }),
    errors,
  };
}

class RepoI18n {
  async locales() {
    return locales.map((item) => new Locale(item));
  }

  async query(code: string) {
    const { config } = await fetchConfig(code.split("-")[0] as ICSupports);
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
        }) ?? {},
        locale,
      );
    return (languages[code] = merge({}, languages[code], data));
  }
}

export const i18n = new RepoI18n();
