const BASE_URL = "https://aintervewbackend.vercel.app/api/v1"

export const auth = {
    SIGNUP : BASE_URL + "/auth/sign_up",
    LOGIN : BASE_URL + "/auth/log_in"
}

export const ai = {
    create_interview : BASE_URL + "/ai/create_interview",
    delete_interview : BASE_URL + "/ai/delete_interview",
    start_interview : BASE_URL + "/ai/start_interview",
    interview_response : BASE_URL + "/ai/interview_response",
    generate_feedback : BASE_URL + "/ai/generate_feedback",
    fetch_feedback : BASE_URL + "/ai/fetch_feedback"
}