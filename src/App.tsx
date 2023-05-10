import React from 'react';
import { BranchOptions, Gitgraph  } from "@gitgraph/react";
import { templateExtend, TemplateName  } from "@gitgraph/core"
import './App.css';

function App() {

  var branchesOrder = ['master', 'hotfix/emergency'];
  var compareBranchesOrder = function(a: any, b:any) {
    return branchesOrder.indexOf(a) - branchesOrder.indexOf(b);
  };

  const options = {
    template: templateExtend(TemplateName.Metro, {
      colors: ["green", "blue", "orange"],
      branch: { 
        label: { 
          display: true,

        },
        spacing: 30,
        lineWidth: 3,
      },
      commit: {
        spacing: 40,
        dot: {
          size: 10,
          //color: "lightgrey",
          strokeWidth: 2,
          strokeColor: "black"
        },
        message: {
          display: false
        }
      },
      tag: {
        color: 'black',
        strokeColor: '#ce9b00',
        bgColor: '#ffce52',
        font: '12pt Courier New',
        borderRadius: 0,
        pointerWidth: 6,
      },
    }),
    compareBranchesOrder: compareBranchesOrder
  }

  return (
    <div className="App">
     <div className="child1">
     <Gitgraph options={options}>{(gitgraph) => {

      const initial = {
        name: "initial",
        subject: "initial",
        author: "Dav <dav@dav-evans.com>",
        tag: "PRODUCTION"
      }

      const commit1 = {
        name: "commit1",
        subject: "commit1",
        author: "Dav <dav@dav-evans.com>",
      }

      const commit2 = {
        name: "commit2",
        subject: "commit2",
        author: "Dav <dav@dav-evans.com>",
      }

      const renderLabel: BranchOptions["renderLabel"] = (branch: any) => {
        return (
          <text
            alignmentBaseline="middle"
            dominantBaseline="middle"
            fill={branch.style.label.color}
            style={
              { font: "12pt Consolas" }
            }
            y={10}
          >
          {branch.name}
          </text>
        );
      };

      console.log("rendering....")
      var master = gitgraph.branch({
        name: "master",
        renderLabel: renderLabel
      });
      master.commit(initial);
      master.commit(commit1);
      master.commit(commit1);
      master.commit(commit1);

      const patch1 = {
        name: "patch1",
        subject: "patch1",
        author: "Dav <dav@dav-evans.com>",
        tag: "STAGING"
      }

      var hotfix = gitgraph.branch({ 
        name: "hotfix/emergency",
        renderLabel: renderLabel 
      });

      hotfix.commit(patch1)

      master.commit(commit2);
      master.commit(commit2);
      master.commit(commit2);
      master.commit(commit2);
      master.commit(commit2);



      }}
      </Gitgraph>
     </div>
     <div className="child2">
        <p>table here</p>
     </div>

     
    </div>
  );
}

export default App;
