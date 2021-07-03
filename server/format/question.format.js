export const formatDataQuestionRequest = (data) => ({
  question_text: data?.question_text || "",
  results: data?.results || [],
  point: parseInt(data?.point) || 1,
  is_many_correct: data?.is_many_correct || false,
  type_question_uid: data?.type_question_uid || null,
  user_uid: data?.user_uid || null,
});

export const formatDataQuestionResponse = (data) => ({
  uid: data?.dataValues?.uid,
  question_text: data?.dataValues?.question_text,
  results: data?.results,
  is_many_correct: data?.dataValues?.is_many_correct || false,
  point: parseInt(data?.dataValues?.point) || 1,
  type_question: data?.type_question,
});

export const formatDataTypeQuestionResponse = (data) => ({
  uid: data?.uid,
  type: data?.type,
  description: data?.description,
});

export const formatDataAnswerResponse = (data) => ({
  uid: data?.uid,
  content: data?.content,
  is_result: data?.is_result,
});
