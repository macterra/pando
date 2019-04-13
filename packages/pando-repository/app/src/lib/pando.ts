import IPLD from 'ipld'
import IPLDGit from 'ipld-git'
const ipfs = IPFS({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })
const ipld = new IPLD({
  blockService: ipfs.block,
  formats: [IPLDGit],
})

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

export function generateIPLDCommit(commit: any): IPLDCommit {
  const authorType = new IPLDAuthor({
    date: commit.author.date,
    name: commit.author.name,
    email: commit.author.email
  });

  const committerType = new IPLDAuthor({
    date: commit.committer.date,
    name: commit.committer.name,
    email: commit.committer.email
  });

  let parents = [];

  for (let i in commit.parents) {
    parents.push( commit.parents[i] as Tree );
  }

  const tree = commit.tree as Tree;

  return new IPLDCommit({
    author: authorType,
    commiter: committerType,
    message: commit.message,
    parents: parents,
    tree: tree
  })
}

//export function fetchModifiedTree(root: Tree): ModifiedTree {}
//export function convertCommitToIPLDCommit(commit: Commit): IPLDCommit {}


