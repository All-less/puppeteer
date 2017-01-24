import { createAction, handleActions } from 'redux-actions'
import _ from 'lodash'

import sourceIcon from '../components/StepMenu/assets/ic_source.png'
import processIcon from '../components/StepMenu/assets/ic_process.png'
import trainIcon from '../components/StepMenu/assets/ic_train.png'
import evaluateIcon from '../components/StepMenu/assets/ic_evaluate.png'


export const toggle = createAction('MENU/TOGGLE', (index) => index)

// The following state is just an example.
// Actual menu contents will be fetched from server.
const initialState = {
  items: [
    {
      name: '选择数据源',
      subitems: ['Hive 查询结果', 'HDFS 文件', '本地文件'],
      expanded: false,
      icon: sourceIcon,
      color: '#7EBD53'
    },
    {
      name: '数据预处理',
      subitems: ['编辑元数据', '清理数据', '数据转换', '组合列', '采样', '选择列', '去重', '连接'],
      expanded: false,
      icon: processIcon,
      color: '#54D0E0'
    },
    {
      name: '训练模型',
      subitems: ['逻辑回归', '深度神经网络', 'Kmeans聚类', '梯度提升决策树', 'DBSCAN聚类', '支持向量机'],
      expanded: false,
      icon: trainIcon,
      color: '#82B1FF'
    },
    {
      name: '模型评估',
      subitems: ['ROC 曲线', 'F1 值', '交叉验证'],
      expanded: false,
      icon: evaluateIcon,
      color: '#4FC3F7'
    }
  ]
}

const handlerMap = {
  [toggle]: (state, action) => {
    return {
      items: state.items.map((item, index) => (
        index !== action.payload
          ? item
          : _.update(item, 'expanded', (value) => (!value))
      ))
    }
  }
}

export default handleActions(handlerMap, initialState)
