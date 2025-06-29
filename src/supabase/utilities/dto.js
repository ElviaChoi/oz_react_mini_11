import { DTO_TYPE } from "./config";

// User data 매핑용 함수
export const changeFromDto = ({ type, dto }) => {
  switch (type) {
    case DTO_TYPE.user: {
      const user = dto?.user;

      return {
        user: {
          id: user?.id || "",
          email: user?.email || "",
          userName:
            user?.user_metadata?.user_name || user?.email?.split("@")[0] || "",
          profileImageUrl:
            user?.user_metadata?.avatar_url || "/images/profile.png",
        },
      };
    }

    case DTO_TYPE.error: {
      if (!dto.error) {
        return {
          error: {
            status: 500,
            message:
              "DTO_TYPE ERROR를 확인해주세요. 데이터 내부 error 객체가 없습니다.",
          },
        };
      }

      const { error: rawError } = dto;

      return {
        error: {
          status: rawError.status,
          message: rawError.message,
        },
      };
    }

    default:
      throw new Error("잘못된 DTO_TYPE입니다.");
  }
};
