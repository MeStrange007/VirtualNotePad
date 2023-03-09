const fs = require("fs")

class Node{
    constructor(pos,data,count=null){
        this.id = count
        this.pos = pos
        this.data = data
        this.left = null
        this.right = null
    }
}

class SplayBst{

    constructor(){
        this.root = null;
        this.count = 0;
    }

    gtPos = (pos1,pos2)=>{
        if(pos1.x>pos2.x){
            return true
        }else if(pos1.x==pos2.x && pos1.y>pos2.y){
            return true
        }else return false
    }    

    stPos = (pos1,pos2)=>{
        if(pos1.x<pos2.x){
            return true
        }else if(pos1.x==pos2.x && pos1.y<pos2.y){
            return true
        }else return false
    }

    eqPos = (pos1,pos2)=>{
        if(pos1.x==pos2.x && pos1.y==pos2.y){
            return true
        }else return false
    }

    search = (k) => {
        if (this.root === null)
            return null;
        this.splay(k);
        return this.root.pos === k ? this.root : null;
    }

    insert = (k,v) => {
        var n;
        this.count++
        if (this.root === null) {
            this.root = new Node(k,v,this.count);
            return;
        }
        this.splay(k);
        if (this.gtPos(this.root.pos,k)) {
            n = new Node(k,v,this.count);
            n.left = this.root.left;
            n.right = this.root;
            this.root.left = null;
            this.root = n;
        } else if (this.stPos(this.root.pos,k)) {
            n = new Node(k,v,this.count);
            n.right = this.root.right;
            n.left = this.root;
            this.root.right = null;
            this.root = n;
        } else {
            this.root.data = v;
        }
    }

    remove = (k) => {
        var temp;
        if (this.root === null )
            return;
        this.splay(k);
        if (this.root.pos === k) {
            if (this.root.left === null && this.root.right === null) {
                this.root = null;
            } else if (this.root.left === null) {
                this.root = this.root.right;
            } else {
                temp = this.root.right;
                this.root = this.root.left;
                this.splay(k);
                this.root.right = temp;
            }
        }
    }

    min = (n) => {
        var current;
        var minRecursive = function(cNode) {
            if (cNode.left) {
            return minRecursive(cNode.left);
            }
            return cNode;
        };
        if (this.root === null)
            return null;
        if (n instanceof Node)
            current = n;
        else
            current = this.root;
        return minRecursive(current);
    }

    max = (n) => {
        var current;
        var maxRecursive = function(cNode) {
            if (cNode.right) {
                return maxRecursive(cNode.right);
            }
            return cNode;
        };
        if (this.root === null)
            return null;
        if (n instanceof Node)
            current = n;
        else
            current = this.root;
        return maxRecursive(current);
    }

    inOrder = (n,fun) => {
        if (n instanceof Node) {
            this.inOrder(n.left,fun);
            if (fun) {fun(n);}
            this.inOrder(n.right,fun);
        }
    }

    contains = (k) => {
        var containsRecursive = function(n) {
            if (n instanceof Node) {
                if (n.pos === k) {
                    return true;
                }
                containsRecursive(n.left);
                containsRecursive(n.right);
            }
        }
        if (this.root === null)
            return false;
        return containsRecursive(this.root) ? true : false;
    }

    rotateRight = (n) => {
        var temp;
        if (n instanceof Node) {
            temp = n.left;
            n.left = temp.right;
            temp.right = n;
        }
        return temp;
    }

    rotateLeft = (n) => {
        var temp;
        if (n instanceof Node) {
            temp = n.right;
            n.right = temp.left;
            temp.left = n;
        }
        return temp;
    }

    splay = (key) => {
        var splayRecursive = function(n, k) {
            if (n === null)
                return null;
            if (this.stPos(k,n.pos)) {
                if (n.left === null) 
                    return n;
                if (this.stPos(k,n.left.pos)) {
                    n.left.left = splayRecursive(n.left.left, k);
                    n = this.rotateRight(n);
                } else if (this.gtPos(k,n.left.pos)) {
                    n.left.right = splayRecursive(n.left.right, k);
                    if (n.left.right !== null)
                    n.left = this.rotateLeft(n.left);
                }
                if (n.left === null)
                    return n;
                else 
                    return this.rotateRight(n);
            } else if (this.gtPos(k,n.pos)) {
                if (n.right === null) 
                    return n;
                if (this.gtPos(k,n.right.pos)) {
                    n.right.right = splayRecursive(n.right.right, k);
                    n = this.rotateLeft(n);
                } else if (this.stPos(k,n.right.pos)) {
                    n.right.left = splayRecursive(n.right.left, k);
                    if (n.right.left !== null)
                    n.right = this.rotateRight(n.right);
                }
                if (n.right === null)
                    return n;
                else 
                    return this.rotateLeft(n);
            } else {
                return n;
            }
        }.bind(this);
        if (this.root === null) {
            throw new Error("Invalid splay");
            return;
        }
        this.root = splayRecursive(this.root,key);
        return;
    }

    save = (filename) => {
        let nodes = [];
        let edges = [];
        let queue = [this.root];
        while (queue.length > 0) {
        let node = queue.shift();
        if (node) {
            let serialized = {
            id:node.id,
            pos: node.pos,
            data: node.data,
            };
            nodes.push(serialized);
            if (node.left) {
            edges.push([node.id, node.left.id]);
            queue.push(node.left);
            }
            if (node.right) {
            edges.push([node.id, node.right.id]);
            queue.push(node.right);
            }
        } else {
            nodes.push(null);
        }
        }
        const data = JSON.stringify({ count:this.count, nodes: nodes, edges: edges });
        fs.writeFile(filename, data, (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log('Tree saved to file.');
            }
        })
    }

    load = (filename) => {
        fs.readFile(filename, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const data = JSON.parse(data);
                this.count = data.count
                let nodes = {};
                for (let i = 0; i < data.nodes.length; i++) {
                    let nodeData = data.nodes[i];
                    if (nodeData) {
                    let id = nodeData.id;
                    let pos = nodeData.pos;
                    let value = nodeData.data
                    let node = new Node(pos,value,id);
                    nodes[id] = node;
                    }
                }
                for (let i = 0; i < data.edges.length; i++) {
                    let edge = data.edges[i];
                    let parent = nodes[edge[0]];
                    let child = nodes[edge[1]];
                    if (parent && child) {
                    if (parent.left === null) {
                        parent.left = child;
                    } else {
                        parent.right = child;
                    }
                    }
                }
                this.root = nodes[data.nodes[0].id];
                console.log('Tree loaded from file:', filename);
            }
        });
    }
}

module.exports = {SplayBst}