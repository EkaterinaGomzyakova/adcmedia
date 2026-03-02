import React, { useEffect, useState } from 'react'
import ReactFlow, {
  Controls,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  useReactFlow,
  Handle,
  Position
} from 'reactflow'
import 'reactflow/dist/style.css'
import './O_canvasCards.css'
import graphData from '../../../data/graph-authors.json'

const UserCardNode = ({ data }) => {
  return (
    <div className="O_UserCard">
      <Handle
        type="target"
        position={Position.Left}
        id="target"
        style={{ background: 'transparent', border: 'none' }}
      />

      <img
        src={data.image}
        alt={data.label}
        style={{
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          objectFit: 'cover',
          flexShrink: 0
        }}
      />

      <div
        style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'flex-start',
          width: '100%'
        }}
      >
        <div
          style={{
            width: '16px',
            height: '16px',
            background: 'var(--button-primary, #3cc68b)',
            borderRadius: '50%',
            flexShrink: 0
          }}
        />
        <p
          style={{
            fontFamily: 'Suisse Intl',
            fontSize: '17px',
            fontWeight: 400,
            lineHeight: '1.4',
            letterSpacing: '-0.34px',
            color: 'var(--dark-button-text, #fdfdfd)',
            margin: 0,
            flex: 1
          }}
        >
          {data.label}
        </p>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="source"
        style={{ background: 'transparent', border: 'none' }}
      />
    </div>
  )
}

const nodeTypes = {
  userCard: UserCardNode
}

const CurvyEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style = {},
  markerEnd
}) => {
  const path = `M ${sourceX},${sourceY} L ${targetX},${targetY}`

  return (
    <g className="react-flow__edge">
      <path
        id={id}
        d={path}
        fill="none"
        stroke="#8E8E8E"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        markerEnd={markerEnd}
        style={{ pointerEvents: 'none', ...style }}
        className="react-flow__edge-path"
      />
    </g>
  )
}

const edgeTypes = {
  curvy: CurvyEdge
}

const FlowContent = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  loading
}) => {
  const { fitView } = useReactFlow()

  useEffect(() => {
    if (nodes.length > 0 && !loading) {
      setTimeout(() => {
        fitView({ padding: 0.2, duration: 200 })
      }, 100)
    }
  }, [nodes, loading, fitView])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        minZoom={0.1}
        maxZoom={2}
      >
        <Controls />
      </ReactFlow>
    </div>
  )
}

const O_canvasCards = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const processGraphData = () => {
    const authorsArray = graphData.authors.slice(0, 20)
    console.log('Loaded authors:', authorsArray.length)
    console.log('First author:', authorsArray[0])
    const pseudoHash = (s) => {
      let h = 2166136261 >>> 0
      for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i)
        h = Math.imul(h, 16777619) >>> 0
      }
      return h >>> 0
    }

    const vw =
      typeof window !== 'undefined' && window.innerWidth
        ? window.innerWidth
        : 1200
    const vh =
      typeof window !== 'undefined' && window.innerHeight
        ? window.innerHeight
        : 800

    const nodeW = 348
    const nodeH = 260
    const nodeDiameter = Math.max(nodeW, nodeH)
    const n = Math.max(1, authorsArray.length)

    const cx = Math.round(vw / 2)
    const cy = Math.round(vh / 2)

    const baseRadius = Math.max(nodeDiameter, Math.ceil(nodeDiameter * 0.9))
    const ringGap = Math.round(nodeDiameter * 0.35)

    let remaining = authorsArray.length
    let ringIndex = 0
    let processedNodes = []
    let idx = 0

    while (remaining > 0) {
      const radius = baseRadius + ringIndex * (nodeDiameter + ringGap)

      const spacing = nodeDiameter * 0.95

      const capNoise = (pseudoHash('cap' + ringIndex) % 200) / 1000 + 0.85
      const capacity = Math.max(
        1,
        Math.floor(((2 * Math.PI * radius) / spacing) * capNoise)
      )
      const placeCount = Math.min(capacity, remaining)

      for (let k = 0; k < placeCount; k++) {
        const author = authorsArray[idx]

        const ringPhase =
          ((pseudoHash('ring' + ringIndex) % 1000) / 1000) * (2 * Math.PI)
        const angle = ringPhase + (2 * Math.PI * k) / placeCount

        const seed = pseudoHash(String(author.id) + String(idx))
        const angleJitter =
          ((seed % 1000) / 1000 - 0.5) * ((2 * Math.PI) / placeCount) * 0.6
        const radialJitter =
          (((seed >>> 10) % 1000) / 1000 - 0.5) * Math.min(80, radius * 0.12)

        const a = angle + angleJitter
        const r = radius + radialJitter
        const px = cx + Math.cos(a) * r - nodeW / 2
        const py = cy + Math.sin(a) * r - nodeH / 2

        processedNodes.push({
          id: String(author.id),
          type: 'userCard',
          data: { label: author.name, image: author.image },
          position: { x: Math.round(px), y: Math.round(py) }
        })
        idx++
      }

      remaining -= placeCount
      ringIndex++

      if (
        baseRadius + ringIndex * (nodeDiameter + ringGap) >
        Math.max(vw, vh) * 2
      ) {
        const paddingX = 24
        const paddingY = 24
        const cols = Math.ceil(Math.sqrt(remaining))
        for (let j = 0; j < remaining; j++) {
          const author = authorsArray[idx]
          const col = j % cols
          const row = Math.floor(j / cols)
          const x =
            cx -
            Math.floor((cols * (nodeW + paddingX)) / 2) +
            col * (nodeW + paddingX)
          const y = cy + radius + row * (nodeH + paddingY)
          processedNodes.push({
            id: String(author.id),
            type: 'userCard',
            data: { label: author.name, image: author.image },
            position: { x: Math.round(x), y: Math.round(y) }
          })
          idx++
        }
        break
      }
    }

    // Create edges based on connections
    const processedEdges = []
    authorsArray.forEach((author) => {
      if (author.connections && Array.isArray(author.connections)) {
        author.connections.forEach((targetId) => {
          processedEdges.push({
            id: `${author.id}-${targetId}`,
            source: String(author.id),
            target: String(targetId),
            type: 'curvy',
            animated: false
          })
        })
      }
    })

    const sanitizedEdges = processedEdges.map((ed) => {
      const copy = { ...ed }
      if (copy.sourceHandle == null || copy.sourceHandle === 'undefined')
        delete copy.sourceHandle
      if (copy.targetHandle == null || copy.targetHandle === 'undefined')
        delete copy.targetHandle
      return copy
    })

    return { nodes: processedNodes, edges: sanitizedEdges }
  }

  useEffect(() => {
    try {
      setLoading(true)
      setError(null)

      const { nodes: processedNodes, edges: processedEdges } =
        processGraphData()
      setNodes(processedNodes)
      setEdges(processedEdges)
    } catch (err) {
      setError(err.message)
      console.error('Error processing graph data:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  if (error) {
    return (
      <div className="O_canvasCards">
        <div className="error">
          <h3>Ошибка загрузки данных</h3>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="O_canvasCards">
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            zIndex: 10,
            background: 'white',
            padding: '10px',
            borderRadius: '5px'
          }}
        >
          Загрузка...
        </div>
      )}
      <ReactFlowProvider>
        <FlowContent
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          loading={loading}
        />
      </ReactFlowProvider>
    </div>
  )
}

export default O_canvasCards
