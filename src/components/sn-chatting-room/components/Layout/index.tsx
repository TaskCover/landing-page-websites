import { FC, ReactNode } from "react"
import ChattingRoomMobileLayout from "./ChattingRoomMobileLayout"

interface ChattingRoomLayoutProps {
    children: ReactNode,
    isMobile?: boolean
}

const ChattingRoomLayout: FC<ChattingRoomLayoutProps> = ({ children, isMobile }) => {
    if(isMobile){
        return <ChattingRoomMobileLayout>{children}</ChattingRoomMobileLayout>
    }
    return children
}

export default ChattingRoomLayout