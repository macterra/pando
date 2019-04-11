export interface IPLDAuthor {
  name: string
  email: string
  date: Date
}

type Tree = { [path: string]: string }
type ModifiedTree = {
  [path: string]: {
    lastEdit: {
      date: Date
      message: string
    }
    mode: string
    blob: string
  }
}

export interface IPLDCommit {
  author: IPLDAuthor
  committer: IPLDAuthor
  message: string
  parents: Tree[]
  tree: Tree | ModifiedTree
}

export interface Commit extends IPLDCommit { //What if instead of using a new interface we make the first two properties optional inside of IPLDCommit?
  cid: string
  sha: string
}

//function generateIPLDCommit(obj: any): IPLDCommit {}
//function getModifiedTree(root: Tree): ModifiedTree {}
//function convertCommitToIPLDCommit(commit: Commit): IPLDCommit {}


