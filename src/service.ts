export interface Design {
  id: string;
  name: string;
  has_pages: boolean;
  status: string;
}

export async function uploadFile(file: File): Promise<Design> {
  const requestBody = new FormData();

  requestBody.append("file", file);

  const res = await fetch("https://api.opendesign.dev/designs/upload", {
    method: "post",
    body: requestBody,
    headers: {
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MzM1NTcyNjAsInYiOjAsImV4cCI6MzMxNTg5MzAwNjAsImlzcyI6ImF2b2NvZGUtbWFuYWdlciIsImQiOnsiaWQiOjEyNTYzNTMsImNvbnRleHQiOiJvZC1hcGkiLCJ0b2tlbl9pZCI6MjE3MTMzNiwiZ3JhbnRfaWQiOjkxOTAyNTF9fQ.p5kXECna61IsR_H2_wqPg-8Pc_HSB9gD9ixkSr3PHEU`,
    },
  });
  const { design } = await res.json();
  return design;
}

export async function getDesignInfoStatus(designID: string): Promise<string> {
  const res = await fetch(`https://api.opendesign.dev/designs/${designID}`, {
    method: "get",
    headers: {
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MzM1NTcyNjAsInYiOjAsImV4cCI6MzMxNTg5MzAwNjAsImlzcyI6ImF2b2NvZGUtbWFuYWdlciIsImQiOnsiaWQiOjEyNTYzNTMsImNvbnRleHQiOiJvZC1hcGkiLCJ0b2tlbl9pZCI6MjE3MTMzNiwiZ3JhbnRfaWQiOjkxOTAyNTF9fQ.p5kXECna61IsR_H2_wqPg-8Pc_HSB9gD9ixkSr3PHEU`,
    },
  });
  const { status } = await res.json();
  return status;
}

interface ArtBoard {
  id: string;
  name: string;
  has_content: boolean;
  status: string;
}

export async function getArtBoards(designID: string): Promise<ArtBoard[]> {
  const res = await fetch(
    `https://api.opendesign.dev/designs/${designID}/summary`,
    {
      method: "get",
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MzM1NTcyNjAsInYiOjAsImV4cCI6MzMxNTg5MzAwNjAsImlzcyI6ImF2b2NvZGUtbWFuYWdlciIsImQiOnsiaWQiOjEyNTYzNTMsImNvbnRleHQiOiJvZC1hcGkiLCJ0b2tlbl9pZCI6MjE3MTMzNiwiZ3JhbnRfaWQiOjkxOTAyNTF9fQ.p5kXECna61IsR_H2_wqPg-8Pc_HSB9gD9ixkSr3PHEU`,
      },
    }
  );
  const { artboards } = await res.json();
  return artboards;
}

export async function getArtboardContent(designID: string, artboardId: string) {
  const res = await fetch(
    `https://api.opendesign.dev/designs/${designID}/artboards/${artboardId}/content`,
    {
      method: "get",
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MzM1NTcyNjAsInYiOjAsImV4cCI6MzMxNTg5MzAwNjAsImlzcyI6ImF2b2NvZGUtbWFuYWdlciIsImQiOnsiaWQiOjEyNTYzNTMsImNvbnRleHQiOiJvZC1hcGkiLCJ0b2tlbl9pZCI6MjE3MTMzNiwiZ3JhbnRfaWQiOjkxOTAyNTF9fQ.p5kXECna61IsR_H2_wqPg-8Pc_HSB9gD9ixkSr3PHEU`,
      },
    }
  );
  const body = await res.json();
  return body;
}
