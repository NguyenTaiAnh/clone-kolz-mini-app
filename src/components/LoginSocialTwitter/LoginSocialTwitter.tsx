/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/**
 *
 * LoginSocialTwitter
 *
 */
import { socialApi } from "@apis/socialLogin";
import { setLocalStorage } from "@utils";
import React, { memo, useCallback, useEffect } from "react";
const TWITTER_URL = "https://x.com";
const TWITTER_API_URL = "https://api.twitter.com";
const PREVENT_CORS_URL = "https://cors.bridged.cc";
const PASS_CORS_KEY = "875c0462-6309-4ddf-9889-5227b1acc82c"
interface LoginSocialTwitterProps{
    client_id:string,
  className?:string,
  redirect_uri:any,
  children:any,
  fields?:any,
  state?:any,
  scope?:any,
  isOnlyGetCode?:boolean,
  isOnlyGetToken?:boolean,
  onLoginStart:any,
  onReject:any,
  onResolve:any,
}
const LoginSocialTwitter:React.FC<LoginSocialTwitterProps> = ({
  client_id,
  className = "",
  redirect_uri,
  children,
  fields = "created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld",
  state = "state",
  scope = "users.read%20tweet.read",
  isOnlyGetCode = false,
  isOnlyGetToken = false,
  onLoginStart,
  onReject,
  onResolve,
}) => {
  useEffect(() => {
    const popupWindowURL = new URL(window.location.href);
    const code = popupWindowURL.searchParams.get("code");
    const state = popupWindowURL.searchParams.get("state");
    if (state?.includes("_twitter") && code) {
      localStorage.setItem("twitter", code);
      window.close();
    }
  }, []);

  const getProfile = useCallback(
    (data:any) => {
      const url = `${PREVENT_CORS_URL}/${TWITTER_API_URL}/2/users/me?user.fields=${fields}`;
      fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.access_token}`,
          "x-cors-grida-api-key": PASS_CORS_KEY,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          onResolve({ provider: "twitter", data: { ...data, ...res.data } });
        })
        .catch((err) => onReject(err));
    },
    [fields, onReject, onResolve]
  );

  const getAccessToken = useCallback(
    async (code:any) => {
      if (isOnlyGetCode) onResolve({ provider: "twitter", data: { code } });
      else {
        const details = {
          code,
          redirect_uri,
          client_id,
          grant_type: `authorization_code`,
          code_verifier: "challenge",
        };
        // setIsFetching(true)

        try {
          const login = await socialApi.loginTwitter(details)
          const info = await socialApi.getInfo({access_token: login.access_token})
          setLocalStorage("twitter_token",info)
        //   setIsFetching(false)
        } catch (error) {
        //   setIsFetching(false)
          console.log({error})
        }
        // const login = await socialLogin.loginTwitter(details)
        // console.log({login})
        // const info = await socialLogin.getInfo({access_token: login.access_token})
        // console.log({info})
        // const requestOAuthURL = `${PREVENT_CORS_URL}/${TWITTER_API_URL}/2/oauth2/token`;
        // const data = await fetch(requestOAuthURL, {
        //   method: "POST",
        //   body: details,
        //   headers: {
        //     "Content-Type": "application/x-www-form-urlencoded",
        //     "x-cors-grida-api-key": PASS_CORS_KEY,
        //   },
        // })
        //   .then((data) => data.json())
        //   .catch((err) => onReject(err));

        // if (data.access_token) {
        //   if (isOnlyGetToken) onResolve({ provider: "twitter", data });
        //   else getProfile(data);
        // }
      }
    },
    [
      onReject,
      getProfile,
      onResolve,
      client_id,
      redirect_uri,
      isOnlyGetCode,
      isOnlyGetToken,
    ]
  );

  const handlePostMessage = useCallback(
    async ({ type, code, provider }:any) =>
      type === "code" && provider === "twitter" && code && getAccessToken(code),
    [getAccessToken]
  );

  const onChangeLocalStorage = useCallback(() => {
    window.removeEventListener("storage", onChangeLocalStorage, false);
    const code = localStorage.getItem("twitter");
    if (code) {
      handlePostMessage({ provider: "twitter", type: "code", code });
      localStorage.removeItem("twitter");
    }
  }, [handlePostMessage]);

  const onLogin = useCallback(() => {
    onLoginStart && onLoginStart();
    window.addEventListener("storage", onChangeLocalStorage, false);
    const oauthUrl = `${TWITTER_URL}/i/oauth2/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&state=${
      state + "_twitter"
    }&code_challenge=challenge&code_challenge_method=plain`;
    const width = 450;
    const height = 730;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    window.open(
      oauthUrl,
      "twitter",
      "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" +
        width +
        ", height=" +
        height +
        ", top=" +
        top +
        ", left=" +
        left
    );
  }, [
    scope,
    state,
    client_id,
    onLoginStart,
    redirect_uri,
    onChangeLocalStorage,
  ]);

  return (
    <div className={className} onClick={onLogin}>
      {children}
    </div>
  );
};

export default memo(LoginSocialTwitter);
