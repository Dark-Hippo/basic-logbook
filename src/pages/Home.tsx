import { AddNewLogbookModal } from "../components/AddNewLogbookModal"
import { LogbookList } from "../components/LogbookList"

export const Home = () => {
  return (
    <>
      <LogbookList />
      <AddNewLogbookModal />
    </>
  )
}