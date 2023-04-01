package tools

import (
	"crypto/tls"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"strings"
)

var httpClient = &http.Client{}

func init() {
	tr := &http.Transport{
		TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
	}
	httpClient = &http.Client{Transport: tr}
}

//也可以返回成string，改写最后的return为string(b)
func ResponseHandle(resp *http.Response, err error) ([]byte, error) {
	if err != nil {
		return []byte(""), err
	}
	b, err := ioutil.ReadAll(resp.Body)
	defer resp.Body.Close()
	if err != nil {
		return []byte(""), err
	}
	return b, nil
}

func ConvertToQueryParams(requrl string, params map[string]string) string {
	data := url.Values{}
	for key, value := range params {
		data.Set(key, value)
	}
	u, _ := url.ParseRequestURI(requrl)
	u.RawQuery = data.Encode()
	return u.String()
}

func XPost(url string, params map[string]string, body string) ([]byte, error) {
	req, err := http.NewRequest("POST", url, strings.NewReader(body))
	if err != nil {
		return []byte(""), err
	}
	req.Header.Set("Authorization", fmt.Sprintf(`Bearer %s`, params["token"]))
	resp, err := httpClient.Do(req)
	return ResponseHandle(resp, err)
}

func XPostChat(url string, body string) ([]byte, error) {
	resp, err := httpClient.Post(
		url,
		"application/json",
		strings.NewReader(body),
	)
	return ResponseHandle(resp, err)
}

func XGet(url string, params map[string]string) ([]byte, error) {
	resp, err := httpClient.Get(ConvertToQueryParams(url, params))
	resp.Header.Set("Authorization", fmt.Sprintf(`Bearer %s`, params["token"]))
	return ResponseHandle(resp, err)
}
