# from typing import List
# from uuid import UUID

# from sqlalchemy.orm import Session

# from app.models.chat import Chat


# class ChatRepository:

#     def __init__(self, db: Session):
#         self.db = db

#     def create_message(
#         self,
#         user_id: UUID,
#         role: str,
#         message: str,
#     ) -> Chat:

#         chat = Chat(
#             user_id=user_id,
#             role=role,
#             message=message,
#         )

#         self.db.add(chat)
#         self.db.commit()
#         self.db.refresh(chat)

#         return chat

#     def get_chat_history(
#         self,
#         user_id: UUID,
#         limit: int = 20,
#     ) -> List[Chat]:

#         return (
#             self.db.query(Chat)
#             .filter(Chat.user_id == user_id)
#             .order_by(Chat.created_at.asc())
#             .limit(limit)
#             .all()
#         )


from typing import List
from uuid import UUID

from sqlalchemy.orm import Session

from app.models.chat import Chat


class ChatRepository:

    def __init__(self, db: Session):
        self.db = db

    def create_message(
        self,
        user_id: UUID,
        role: str,
        message: str,
    ) -> Chat:

        chat = Chat(
            user_id=user_id,
            role=role,
            message=message,
        )

        self.db.add(chat)
        self.db.commit()
        self.db.refresh(chat)

        return chat

    def get_chat_history(
        self,
        user_id: UUID,
        limit: int = 20,
    ) -> List[Chat]:

        return (
            self.db.query(Chat)
            .filter(Chat.user_id == user_id)
            .order_by(Chat.created_at.asc())
            .limit(limit)
            .all()
        )