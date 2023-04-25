from fastapi import HTTPException, status

class APIException(HTTPException):
    def __init__(self, message: str, status_code: int):
        super().__init__(status_code=status_code, detail={"message": message})




