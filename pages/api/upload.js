import nextConnect from "next-connect";
import upload from "../../utils/upload";

const apiRoute = nextConnect({
  onError(error, _req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.array("image"));

apiRoute.post(async (req, res) => {
  const images = req.files.map((image) => image.filename);
  res.status(200).json(images);
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
