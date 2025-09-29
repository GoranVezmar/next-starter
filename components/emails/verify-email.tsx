import { Body, Button, Container, Head, Hr, Html, Section, Tailwind, Text } from "@react-email/components";

import { serverTranslator } from "@/i18n/server-translator";

type VerifyEmailProps = {
  username: string;
  verifyUrl: string;
  locale?: string;
};

export const VerifyEmail = ({ username, verifyUrl, locale = "en" }: VerifyEmailProps) => {
  const t = serverTranslator(locale);

  return (
    <Html lang={locale} dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 py-[40px] font-sans">
          <Container className="mx-auto max-w-[600px] rounded-[8px] bg-white p-[32px]">
            <Section>
              <Text className="mt-0 mb-[16px] text-[24px] font-bold text-gray-900">{t("emailTemplates.verifyEmail.title")}</Text>

              <Text className="mt-0 mb-[24px] text-[16px] leading-[24px] text-gray-700">
                {t("emailTemplates.verifyEmail.description", { username })}
              </Text>

              <Section className="mb-[32px] text-center">
                <Button
                  href={verifyUrl}
                  className="box-border rounded-[6px] bg-blue-600 px-[32px] py-[12px] text-[16px] font-medium text-white no-underline"
                >
                  {t("emailTemplates.verifyEmail.button.label")}
                </Button>
              </Section>

              <Text className="mt-0 mb-[24px] text-[14px] leading-[20px] text-gray-600">
                {t("emailTemplates.verifyEmail.fullLinkDescription")}
                <br />
                {verifyUrl}
              </Text>

              <Text className="mt-0 mb-[32px] text-[14px] leading-[20px] text-gray-600">{t("emailTemplates.verifyEmail.expiration")}</Text>

              <Hr className="my-[24px] border-gray-200" />

              <Text className="m-0 text-[12px] leading-[16px] text-gray-500">
                {t("emailTemplates.verifyEmail.bestRegards")}
                <br />
                {t("emailTemplates.verifyEmail.teamName")}
              </Text>
            </Section>

            <Section className="mt-[32px] border-t border-gray-200 pt-[24px]">
              <Text className="m-0 text-center text-[12px] leading-[16px] text-gray-400">
                {t("emailTemplates.verifyEmail.companyName")}
                <br />
                {t("emailTemplates.verifyEmail.address")}
                <br />
                {t("emailTemplates.verifyEmail.city")}
              </Text>

              <Text className="m-0 mt-[8px] text-center text-[12px] leading-[16px] text-gray-400">
                {t("emailTemplates.verifyEmail.disclaimer")}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
