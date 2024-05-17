const articleBodyEditor = await ClassicEditor.create(document.querySelector("#editor"), {
  language: "fa",
})
const mainUrl = "https://asancode-backend.liara.run/v1";
import { getToken, showToastSwal } from "../../../js/funcs/utils.js";
import { renderArticles, loadCategories } from "../../../js/panel/funcs/shared.js";
import { readyCourseCategory } from "../../../js/panel/funcs/utils.js";

const createArticleData = () => {
  // Elements \\
  let articleTitleInput = document.querySelector("#article-title")
  let articleHrefInput = document.querySelector("#article-href")
  let articlDescriptionInput = document.querySelector("#article-description")
  let articleCoverInput = document.querySelector("#article-cover")
  let articleCategoryWrapper = document.querySelector(".category-list")

  let articleData = new FormData();
  articleData.append('title', articleTitleInput.value.trim())
  articleData.append('shortName', articleHrefInput.value.trim())
  articleData.append('description', articlDescriptionInput.value.trim())
  articleData.append('cover', articleCoverInput.files[0])
  articleData.append('categoryID', articleCategoryWrapper.dataset.category)
  articleData.append('body', articleBodyEditor.getData());

  return articleData
}

const sendArticleDataReq = async articleData => {
  let sendReq = await fetch(`${mainUrl}/articles`, {
    method: 'POST',
    headers : {
      Authorization : `Bearer ${getToken()}`
    },
    body : articleData
  })

  let sendRes = await sendReq.json()

  return sendReq.ok ? sendReq : sendRes
}



const uploadArticle = async () => {
  let articleData = createArticleData()

  let sendReq = await sendArticleDataReq(articleData)

  if (sendReq.ok) {
    showToastSwal('موفق', 'مقاله با موفقیت ثبت شد', 'success')
    renderArticles();
  }else{
    showToastSwal('ناموفق', sendReq?.message[0]?.message || sendReq.message)
  }
}

const draftArticleData = async articleData => {
  let draftReq = await fetch(`${mainUrl}/articles/draft`, {
    method: 'POST',
    headers : {
      Authorization :`Bearer ${getToken()}`
    },
    body : articleData
  })

  let draftRes = await draftReq.json()

  return draftReq.ok ? draftReq : draftRes
}

const draftArticle = async () => {
  let articleData = createArticleData();

  let draftReq = await draftArticleData(articleData)

  if (draftReq.ok) {
    showToastSwal('موفق', 'مقاله مورد نظر با موفقیت پیش نویس شد', 'success')
    renderArticles()
  }else{
    showToastSwal('ناموفق', draftReq?.message[0]?.message || draftReq.message, 'error')
  }

}

renderArticles();
window.draftArticle = draftArticle
window.uploadArticle = uploadArticle
await loadCategories();
readyCourseCategory();
